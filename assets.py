from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
files=sorted(Path('public/images').glob('photo*'))
out=Image.new('RGB',(1000,((len(files)+5)//6)*150),'white')
d=ImageDraw.Draw(out)
for i,p in enumerate(files):
 im=Image.open(p); im.thumbnail((160,125)); x=(i%6)*166; y=(i//6)*150; out.paste(im,(x,y)); d.text((x,y+126),p.stem,fill='black')
out.save('contact-sheet.jpg')
