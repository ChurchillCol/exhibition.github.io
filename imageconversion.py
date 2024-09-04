from PIL import Image

imgin = "Images/new/t20.png"
imgout = "Images/old/test.png"

def make_square_transparent(image_path, output_path):
    # Open the original image
    img = Image.open(image_path).convert("RGBA")
    
    # Get the original image size
    original_width, original_height = img.size
    
    # Determine the size of the new square canvas
    square_size = max(original_width, original_height)
    
    # Create a new image with a transparent background
    square_img = Image.new("RGBA", (square_size, square_size), (0, 0, 0, 0))
    
    # Calculate the position to paste the original image onto the center of the square canvas
    paste_position = (
        (square_size - original_width) // 2,
        (square_size - original_height) // 2
    )
    
    # Paste the original image onto the square canvas
    square_img.paste(img, paste_position)
    
    # Save the new image
    square_img.save(output_path)

# Example usage
def convertthemall():
    for i in range(60):
        make_square_transparent("Images/newpngs/t"+str(i)+".png", "Images/newpngs/converted/t"+str(i)+".png")
    return


convertthemall()
    


