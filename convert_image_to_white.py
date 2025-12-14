import sys
from PIL import Image

def convert_to_white_preserving_alpha(input_path, output_path):
    try:
        img = Image.open(input_path)

        # Ensure the image has an alpha channel
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Get pixel data
        pixels = img.load()
        width, height = img.size

        for x in range(width):
            for y in range(height):
                r, g, b, a = pixels[x, y]
                if a > 0:  # If the pixel is not fully transparent
                    pixels[x, y] = (255, 255, 255, a) # Set RGB to white, preserve alpha

        img.save(output_path)
        print(f"Successfully converted '{input_path}' to white (preserving alpha) and saved to '{output_path}'")
    except FileNotFoundError:
        print(f"Error: Input file '{input_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_image_to_white.py <input_image_path> <output_image_path>")
        sys.exit(1)

    input_image_path = sys.argv[1]
    output_image_path = sys.argv[2]
    convert_to_white_preserving_alpha(input_image_path, output_image_path)
