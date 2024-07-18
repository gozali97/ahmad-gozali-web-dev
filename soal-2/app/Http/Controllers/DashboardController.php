<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $provinces = $this->getProvince();

        $cities = [];
        $costs = [];

        if($request->prov_id) {
            $cities = $this->getCities($request->prov_id);
        }

        if($request->prov_id && $request->city_id && $request->berat && $request->ekspedisi) {
            $costs = $this->getCost($request->prov_id, $request->city_id, $request->berat, $request->ekspedisi);
        }

        return Inertia::render('Dashboard/Index', [
            'provinces' => $provinces,
            'cities' => $cities,
            'costs' => $costs
        ]);
    }

    public function getCost($origin, $destination, $weight, $courier)
    {
        $client = new Client();
        $response = $client->request('POST', 'https://api.rajaongkir.com/starter/cost', [
            'headers' => [
                'key' => env('RAJAONGKIR_API_KEY'),
                'content-type' => 'application/x-www-form-urlencoded',
            ],
            'form_params' => [
                'origin' => $origin,
                'destination' => $destination,
                'weight' => $weight,
                'courier' => $courier,
            ],
        ]);

        $data = json_decode($response->getBody(), true);

        return $data['rajaongkir']['results'][0]['costs'];
    }

    public function getCities($prov_id)
    {
        $client = new Client();
        $response = $client->request('GET', 'https://api.rajaongkir.com/starter/city', [
            'headers' => [
                'key' => env('RAJAONGKIR_API_KEY'),
            ],
            'query' => [
                'province' => $prov_id,
            ],
        ]);

        $data = json_decode($response->getBody(), true);

        return $data['rajaongkir']['results'];
    }

    public function getProvince()
    {
        $client = new Client();
        $response = $client->request('GET', 'https://api.rajaongkir.com/starter/province', [
            'headers' => [
                'key' => env('RAJAONGKIR_API_KEY'),
            ],
        ]);

        $data = json_decode($response->getBody(), true);

        return $data['rajaongkir']['results'];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
