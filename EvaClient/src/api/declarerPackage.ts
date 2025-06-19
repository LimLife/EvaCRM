import { DeclarerPackageType } from "./typeApi/declarerPackageType";
const urlType = import.meta.env.VITE_URL_TYPE;

export const declarerPackage = async (declare: string): Promise<DeclarerPackageType | null> =>
{
    try
    {
        const response: Response = await fetch(`${urlType}/${declare}`)
        return response.json() as Promise<DeclarerPackageType>;
    }
    catch 
    {
        return null;
    }
}