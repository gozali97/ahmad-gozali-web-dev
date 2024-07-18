import Guest from "@/Layouts/GuestLayout.jsx";
import {Head, useForm, usePage} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useEffect, useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Select from "@/Components/Select.jsx";

export default function Index() {
    const {provinces, cities, costs} = usePage().props

    const {data, setData, post, reset, errors, processing} = useForm({
        nama_produk: '',
        berat: '',
        prov_id: '',
        city_id: '',
        ekspedisi: '',
    });


    useEffect(() => {
        if (data.prov_id) {
            post(route('home'), {
                preserveState: true,
                replace: true,
            });
        }
    }, [data.prov_id]);

    const getOngkir = (e) => {
        e.preventDefault();

        post(route('home'), {
            data: {
                nama_produk: data.nama_produk,
                berat: data.berat,
                prov_id: data.prov_id,
                city_id: data.city_id,
                ekspedisi: data.ekspedisi,
            },
            preserveState: true,
            replace: true,
        });
    };

    const resetForm = () => {
        reset({
            nama_produk: '',
            berat: '',
            prov_id: '',
            city_id: '',
            ekspedisi: '',
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value).replace('IDR', 'Rp.');
    };

    return (
        <Guest>
            <Head title="Dashboard"/>
            <div className="max-w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid md:grid-cols-2 items-center gap-12 px-4">
                    <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-white  rounded">
                        <div className="mx-auto max-w-3xl">
                            <div className="text-center">
                                <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                                    Cek Ongkir Produk
                                </h2>
                            </div>

                            <div
                                className="mt-5 p-4 relative z-10 bg-white border border-gray-400 rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
                                <form onSubmit={getOngkir}>
                                    <div className="mb-4">
                                        <div>
                                            <InputLabel htmlFor="name" value="Nama Produk"/>
                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.nama_produk}
                                                onChange={(e) => setData('nama_produk', e.target.value)}
                                                required
                                                isFocused
                                            />
                                            <InputError className="mt-2" message={errors.nama_produk}/>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="berat_produk" value="Berat Produk"/>
                                        <TextInput
                                            id="berat_produk"
                                            type={'number'}
                                            className="mt-1 block w-full"
                                            value={data.berat}
                                            onChange={(e) => setData('berat', e.target.value)}
                                            required
                                            isFocused
                                        />
                                        <InputError className="mt-2" message={errors.berat}/>
                                    </div>
                                    <div className="mb-4">
                                        <Select
                                            label={'Provinsi'}
                                            value={data.prov_id}
                                            onChange={e => setData('prov_id', e.target.value)}
                                            errors={errors.prov_id}
                                        >
                                            <option value="">Pilih</option>
                                            {provinces.map((province) => (
                                                <option key={province.province_id} value={province.province_id}>
                                                    {province.province}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="mb-4">
                                        <Select
                                            label={'Kota'}
                                            value={data.city_id}
                                            onChange={e => setData('city_id', e.target.value)}
                                            errors={errors.city_id}
                                        >
                                            <option value="">Pilih</option>
                                            {cities.map((city) => (
                                                <option key={city.city_id} value={city.city_id}>
                                                    {city.city_name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <Select
                                            label={'Pilih Ekspedisi'}
                                            value={data.ekspedisi}
                                            onChange={e => setData('ekspedisi', e.target.value)}
                                            errors={errors.ekspedisi}
                                        >
                                            <option value="">Pilih Ekspedisi</option>
                                            <option value={'jne'}>JNE</option>
                                            <option value={'pos'}>POS Indonesia</option>
                                            <option value={'tiki'}>Tiki</option>
                                        </Select>
                                    </div>
                                    <div className="mt-6 grid">
                                        <PrimaryButton disabled={processing}
                                                       className={'bg-green-500 hover:bg-green-600 focus:bg-green-600 text-center flex justify-center'}>
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                    <div className="mt-2 grid">
                                        <PrimaryButton
                                            type="button"
                                            onClick={resetForm}
                                            className="bg-red-500 hover:bg-red-600 focus:bg-red-600 text-center flex justify-center"
                                        >
                                            Reset
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-white rounded-lg">
                        <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-10 dark:border-neutral-700">
                            <h2 className="text-xl font-semibold text-gray-800 text-center dark:text-neutral-200">
                                Hasil Cek Ongkir
                            </h2>

                            <div className="mt-3 text-center">
                                {costs.length > 0 ? <>
                                        <div className="flex flex-row gap-4 w-full justify-center">
                                            {costs.map((cost, index) => (
                                                <div className="text-white w-1/3 justify-center bg-gradient-to-b from-green-300 to-green-600 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">
                                                    <div className="p-4 md:p-5">
                                                        <div className="flex">
                                                            <div className="grow ms-5">
                                                                <h3 className="font-bold text-2xl text-white">
                                                                    {cost.service}
                                                                </h3>
                                                                <p className="text-lg white">
                                                                    {formatCurrency(cost.cost[0].value)}
                                                                </p>
                                                                <p className="text-lg white">
                                                                    ({cost.cost[0].etd} days)
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </> :
                                    <>
                                        <p className="text-sm text-gray-500 dark:text-neutral-500">
                                            Data is empty ...
                                        </p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
}
