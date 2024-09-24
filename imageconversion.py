from PIL import Image
import os

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
    return

def resize_if_larger(image_path, output_path, max_size=2000):
    # Open the original image
    img = Image.open(image_path).convert("RGBA")
    
    # Get the original image size
    original_width, original_height = img.size
    
    # Check if the image is larger than the max_size in either dimension
    if original_width > max_size or original_height > max_size:
        # Calculate the new size, maintaining the aspect ratio
        resize_ratio = min(max_size / original_width, max_size / original_height)
        new_size = (int(original_width * resize_ratio), int(original_height * resize_ratio))
        
        # Resize the image
        resized_img = img.resize(new_size, Image.ANTIALIAS)
        
        # Save the resized image
        resized_img.save(output_path, "PNG")
        return
    else:
        print("pass ", image_path)
        return
        
dname = "px-conversions/"
directory = os.fsencode(dname)
    
def resizeall():
    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        resize_if_larger(dname + filename, dname + filename)
        print(filename, " done")
    return

def convertthemall():
    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        make_square_transparent(dname + filename, dname + filename)
        print(file, "done")
    return


resizeall()
    


