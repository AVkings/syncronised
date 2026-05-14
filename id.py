from PIL import Image, ImageDraw, ImageFont
import os

def generate_id_card(id_no, name, phone, output_dir="ids"):
    os.makedirs(output_dir, exist_ok=True)
    # 300 DPI ID size
    img = Image.new("RGB", (1012, 638), "#F8F9FA")
    draw = ImageDraw.Draw(img)
    
    # Header bar
    draw.rectangle([0, 0, 1012, 80], fill="#1A56DB")
    try:
        font_h = ImageFont.truetype("arial.ttf", 28)
        font_b = ImageFont.truetype("arial.ttf", 22)
    except: font_h = font_b = ImageFont.load_default()
    
    draw.text((40, 25), "🏫 SCHOOL VOTING ID", fill="white", font=font_h)
    
    # Photo placeholder
    draw.rectangle([780, 100, 980, 280], outline="#666", width=3)
    draw.text((790, 170), "PHOTO", fill="#888")
    
    # Details
    details = [("Name:", name), ("ID No:", id_no), ("Phone:", f"+91{phone}")]
    y = 140
    for label, val in details:
        draw.text((50, y), f"{label} {val}", fill="#111", font=font_b)
        y += 45
        
    # Save
    path = os.path.join(output_dir, f"{id_no}.png")
    img.save(path)
    return path

# Generate test IDs
generate_id_card("SCH001", "Avnish", "919309268898")
generate_id_card("SCH002", "raju", "919309268898")
generate_id_card("SCH003", "samay", "919309268898")
