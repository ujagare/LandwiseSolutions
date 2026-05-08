<?php
// Set headers to handle CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Initialize response array
$response = array(
    "success" => false,
    "message" => ""
);

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    // Get form data
    $name = isset($_POST['name']) ? filter_var($_POST['name'], FILTER_SANITIZE_STRING) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? filter_var($_POST['phone'], FILTER_SANITIZE_STRING) : '';
    $plot_size = isset($_POST['plot_size']) ? filter_var($_POST['plot_size'], FILTER_SANITIZE_STRING) : '';
    $purpose = isset($_POST['purpose']) ? filter_var($_POST['purpose'], FILTER_SANITIZE_STRING) : '';
    $message = isset($_POST['message']) ? filter_var($_POST['message'], FILTER_SANITIZE_STRING) : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($plot_size) || empty($purpose)) {
        $response["message"] = "Please fill in all required fields.";
        echo json_encode($response);
        exit();
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["message"] = "Please enter a valid email address.";
        echo json_encode($response);
        exit();
    }
    
    // Set email recipient
    $to = "info@landwisesolutions.com"; // Change this to your email address
    
    // Set email subject
    $subject = "New Enquiry from Landwise Solutions Website";
    
    // Create email body
    $email_body = "
    <html>
    <head>
        <title>New Enquiry from Landwise Solutions Website</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #2e7d32; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
            th { background-color: #f9f9f9; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>New Enquiry from Landwise Solutions Website</h2>
            <p>You have received a new enquiry with the following details:</p>
            
            <table>
                <tr>
                    <th>Name:</th>
                    <td>$name</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>$email</td>
                </tr>
                <tr>
                    <th>Phone:</th>
                    <td>$phone</td>
                </tr>
                <tr>
                    <th>Plot Size:</th>
                    <td>$plot_size</td>
                </tr>
                <tr>
                    <th>Purpose:</th>
                    <td>$purpose</td>
                </tr>";
    
    // Add message if provided
    if (!empty($message)) {
        $email_body .= "
                <tr>
                    <th>Message:</th>
                    <td>$message</td>
                </tr>";
    }
    
    $email_body .= "
            </table>
            
            <p>This enquiry was submitted on " . date("F j, Y, g:i a") . "</p>
        </div>
    </body>
    </html>";
    
    // Set email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    
    // Send email
    $mail_sent = mail($to, $subject, $email_body, $headers);
    
    // Check if email was sent successfully
    if ($mail_sent) {
        $response["success"] = true;
        $response["message"] = "Thank you for your enquiry! We will contact you soon.";
    } else {
        $response["message"] = "There was an error sending your message. Please try again.";
    }
    
} else {
    $response["message"] = "Invalid request method.";
}

// Return JSON response
echo json_encode($response);
?>
