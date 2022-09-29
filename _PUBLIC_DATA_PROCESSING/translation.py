import os
import json
import io

path_en = "../public/locales/en/"
path_kr = "../public/locales/kr/"
path_jp = "../public/locales/jp/"

def getFileList(path):
  return os.listdir(path)

def findAndCopy(fileName, log=True):
  with io.open(path_en + fileName, "r", encoding="utf-8") as f:
    default = json.load(f)
  
  # if file is not exist make one
  if not os.path.isfile(path_kr+fileName):
    with io.open(path_kr+fileName, 'w') as f:
      if(log): print(path_kr+fileName+'created in kr')
      json.dump({}, f, indent=2, ensure_ascii=False)
  if not os.path.isfile(path_jp+fileName):
    with io.open(path_jp+fileName, 'w') as f:
      if(log): print(path_jp+fileName+'created in jp')
      json.dump({}, f, indent=2, ensure_ascii=False)
  
  with io.open(path_kr+fileName, 'r') as f:
    kr = json.load(f)
  with io.open(path_jp+fileName, 'r') as f:
    jp = json.load(f)
  
  for key, value in default.items():
    if key not in kr:
      kr[key] = value
      if(log): print(key+" is added to kr")
    if key not in jp:
      jp[key] = value
      if(log): print(key+" is added to jp")

  for key in list(kr.keys()):
    if key not in default:
      if log: print('cleaning ' + key + ' from kr')
      del kr[key]
  
  for key in list(jp.keys()):
    if key not in default:
      if log: print('cleaning ' + key + ' from jp')
      del jp[key]
  
  with io.open(path_kr+fileName, 'w') as f:
    json.dump(kr, f, indent=2, ensure_ascii=False)
  with io.open(path_jp+fileName, 'w') as f:
    json.dump(jp, f, indent=2, ensure_ascii=False)


def main():
  enList = getFileList(path_en)
  for file in enList:
    findAndCopy(file)

if __name__ == "__main__":
  main()