<?php

/*
=========================================================
TUYIZERE Federance Portfolio Contact Form
WORKING VERSION FOR WAMP SERVER
=========================================================
*/

$host = "localhost";
$user = "root";
$password = "";
$database = "portfolio_db";

/*
=========================================================
REAL EMAIL
=========================================================
*/

$your_email = "tuyizerefederance15@gmail.com";

/*
=========================================================
CHECK FORM SUBMISSION
=========================================================
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    /*
    =========================================================
    SANITIZE INPUTS
    =========================================================
    */

    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    /*
    =========================================================
    VALIDATION
    =========================================================
    */

    if (
        empty($name) ||
        empty($email) ||
        empty($subject) ||
        empty($message)
    ) {

        die("Please fill all fields.");

    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        die("Invalid email address.");

    }

    /*
    =========================================================
    DATABASE CONNECTION
    =========================================================
    */

    $conn = new mysqli($host, $user, $password, $database);

    if ($conn->connect_error) {

        die("Database connection failed.");

    }

    /*
    =========================================================
    CREATE TABLE IF NOT EXISTS
    =========================================================
    */

    $table = "
    CREATE TABLE IF NOT EXISTS messages (

        id INT AUTO_INCREMENT PRIMARY KEY,

        name VARCHAR(255) NOT NULL,

        email VARCHAR(255) NOT NULL,

        subject VARCHAR(255) NOT NULL,

        message TEXT NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    ";

    $conn->query($table);

    /*
    =========================================================
    INSERT MESSAGE
    =========================================================
    */

    $stmt = $conn->prepare("
        INSERT INTO messages(name,email,subject,message)
        VALUES(?,?,?,?)
    ");

    $stmt->bind_param(
        "ssss",
        $name,
        $email,
        $subject,
        $message
    );

    $saved = $stmt->execute();

    /*
    =========================================================
    SEND EMAIL
    =========================================================
    */

    $to = $your_email;

    $email_subject = "New Portfolio Message: " . $subject;

    $body = "

You received a new message from your portfolio website.

--------------------------------------------------

Full Name: $name

Email: $email

Subject: $subject

Message:
$message

--------------------------------------------------

";

    $headers = "From: $email";

    $mail_sent = mail(
        $to,
        $email_subject,
        $body,
        $headers
    );

    /*
    =========================================================
    SUCCESS MESSAGE
    =========================================================
    */

    if ($saved || $mail_sent) {

        echo "

        <script>

        alert('Message sent successfully!');

        window.location.href='index.html';

        </script>

        ";

    } else {

        echo "

        <script>

        alert('Message could not be sent.');

        window.location.href='index.html';

        </script>

        ";

    }

    /*
    =========================================================
    CLOSE CONNECTION
    =========================================================
    */

    $stmt->close();

    $conn->close();

}

?>