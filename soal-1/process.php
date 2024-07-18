<?php

class KompakCipta
{
    private $jumlah;
    private $kompakCiptaCount;

    public function __construct($jumlah)
    {
        $this->jumlah = $jumlah;
        $this->kompakCiptaCount = 0;
    }

    public function generateOutput()
    {
        $output = "";
        for ($i = 1; $i <= $this->jumlah; $i++) {
            if ($this->kompakCiptaCount >= 5) {
                break;
            }

            if ($i % 3 == 0 && $i % 5 == 0) {
                $output .= "Kompak Cipta<br>";
                $this->kompakCiptaCount++;
                if ($this->kompakCiptaCount >= 2) {
                    continue;
                }
            } elseif ($i % 3 == 0) {
                if ($this->kompakCiptaCount >= 2) {
                    $output .= "Cipta<br>";
                } else {
                    $output .= "Kompak<br>";
                }
            } elseif ($i % 5 == 0) {
                if ($this->kompakCiptaCount >= 2) {
                    $output .= "Kompak<br>";
                } else {
                    $output .= "Cipta<br>";
                }
            } else {
                $output .= $i . "<br>";
            }
        }
        return $output;
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jumlah = intval($_POST['jumlah']);
    $kompakCipta = new KompakCipta($jumlah);
    $output = $kompakCipta->generateOutput();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Technical Test</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <h1 class="text-center">Hasil Perulangan</h1>
        <div class="result mt-3">
            <?php echo $output; ?>
        </div>
        <a href="index.php" class="btn btn-primary mt-3">Kembali</a>
    </div>
</body>

</html>