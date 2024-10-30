import datetime
import os
import shutil

#file manager singleton class
class fileManager():

    __instance = None

    def __new__(cls, folder_name: str = ''):
        if fileManager.__instance is None:
            fileManager.__instance = object.__new__(cls)
            fileManager.__instance.__folder_name__ = folder_name
            fileManager.__instance.__folders__ = []
        return fileManager.__instance

    def __init__(self, folder_name: str = ''):
        if not os.path.exists(folder_name):
            os.mkdir(folder_name)
        
        self.__folder_name__ = folder_name
        self.__folders__= []

    def generate_folder(self) -> str:
        folder_name =  f"${datetime.datetime.now().microsecond}-{datetime.datetime.now().second}-{datetime.datetime.now().minute}-{datetime.datetime.now().hour}-{datetime.datetime.now().day}-{datetime.datetime.now().month}-{datetime.datetime.now().year}"
        os.mkdir(f"{self.__folder_name__}/{folder_name}")
        self.__folders__.append(folder_name)
        return folder_name


    def delete_all_files(self) -> bool:
        shutil.rmtree(self.__folder_name__)
        os.mkdir(self.__folder_name__)
        self.__folders__ = []
        return True

    def get_acitve_folders(self) -> list:
        return self.__folders__


    def delete_folder(self, folder_name: str) -> bool:
        if not os.path.exists(f"{self.__folder_name__}/{folder_name}"):
            return False

        shutil.rmtree(f"{self.__folder_name__}/{folder_name}")
        self.__folders__.remove(folder_name)
        return True