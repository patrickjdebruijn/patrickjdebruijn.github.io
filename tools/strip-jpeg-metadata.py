"""Remove EXIF/XMP (APP1), Photoshop/IPTC (APP13) and comment segments from a JPEG, in place."""
import sys

path = sys.argv[1]
data = open(path, "rb").read()
assert data[:2] == b"\xff\xd8", "not a JPEG"
out = bytearray(b"\xff\xd8")
i = 2
DROP = {0xE1, 0xED, 0xFE}  # APP1, APP13, COM
while i < len(data):
    assert data[i] == 0xFF, f"bad marker at {i}"
    marker = data[i + 1]
    if marker == 0xDA:  # start of scan: copy the rest verbatim
        out += data[i:]
        break
    length = int.from_bytes(data[i + 2:i + 4], "big")
    seg = data[i:i + 2 + length]
    if marker not in DROP:
        out += seg
    else:
        print(f"dropped segment 0x{marker:02X} ({length} bytes)")
    i += 2 + length
open(path, "wb").write(out)
