<?php
// Sample user data, replace with actual user data from your database
$userData = [
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'profile_pic' => 'default_profile.png', // Default profile picture
    'recently_viewed' => ['Product A', 'Product B', 'Product C'],
    'orders' => ['Order #1', 'Order #2', 'Order #3']
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="style.css">
</head>
<style>
    body {
    background-color: black;
    color: white;
    font-family: Arial, sans-serif;
}

.profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #333;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.profile-header {
    text-align: center;
}

.profile-pic {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 10px 0;
}

.profile-info {
    margin-top: 20px;
}

.profile-info h2 {
    margin-top: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

a {
    color: red;
    text-decoration: none;
    font-weight: bold;
}

</style>
<body>
    <div class="profile-container">
        <div class="profile-header">
            <h1><?php echo htmlspecialchars($userData['name']); ?>'s Profile</h1>
            <img src="<?php echo htmlspecialchars($userData['profile_pic']); ?>" alt="Profile Picture" class="profile-pic">
            <button onclick="document.getElementById('uploadForm').style.display='block'">Change Profile Picture</button>
        </div>
        
        <form id="uploadForm" action="upload.php" method="post" enctype="multipart/form-data" style="display:none;">
            <input type="file" name="profile_pic" required>
            <button type="submit">Upload</button>
        </form>

        <div class="profile-info">
            <p>Email: <?php echo htmlspecialchars($userData['email']); ?></p>
            <h2>Recently Viewed Products</h2>
            <ul>
                <?php foreach ($userData['recently_viewed'] as $product): ?>
                    <li><?php echo htmlspecialchars($product); ?></li>
                <?php endforeach; ?>
            </ul>
            <h2>Order History</h2>
            <ul>
                <?php foreach ($userData['orders'] as $order): ?>
                    <li><?php echo htmlspecialchars($order); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
        
        <a href="index.php">← Back to Home</a>
    </div>
</body>
</html>
