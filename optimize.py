from PIL import Image,ImageOps
from pathlib import Path
for p in Path('public/images').glob('photo*.jpg'):
 im=ImageOps.exif_transpose(Image.open(p)).convert('RGB'); im.thumbnail((1800,1800)); im.save(p.with_suffix('.webp'),'WEBP',quality=85)
