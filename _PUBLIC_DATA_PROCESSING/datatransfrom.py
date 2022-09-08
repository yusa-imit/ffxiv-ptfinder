import json
import io

with io.open('origin.json', 'r', encoding="utf-8") as f:
  r = json.load(f)

arr = []
new = {}

for time in r:
  if time["DisplayName"] in new:
    raise NameError(time["DisplayName"])
  time["Offset"] = time["Offset"].split(" ")[0].replace(":", ".")
  time["DisplayName"] = time["DisplayName"].split("(")[0]+" ("+time["DisplayName"].split("(")[1].replace(" ", "")
  new[time["Name"]] = {
    "displayName": time["DisplayName"],
    "Abbreviation": time["Abbreviation"],
    "offset": float(time["Offset"]),
  }
  if len(time["Abbreviation"])>=2:
    arr.append(time["Name"])

with io.open("./timezones.json", "w", encoding="utf-8") as k:
  json.dump(new,k, indent=None, ensure_ascii=False)

with io.open("./output.json", "w", encoding="utf-8") as k:
  json.dump(r, k, indent=4, ensure_ascii=False)

with io.open("./array.json", "w", encoding="utf-8") as k:
  json.dump(arr, k, indent=None, ensure_ascii=False)