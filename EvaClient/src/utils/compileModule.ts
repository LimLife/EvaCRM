import React from "react";

const compile = import.meta.env.VITE_URL_COMPILE;

export const compileModule = async (code: string): Promise<React.FC> =>
{
    const response = await fetch(`${compile}/compile`, {
        method: "GET",
        headers: {
            "Content-Type": "text/javascript"
        },
        body: JSON.stringify({
            code: code
        })
    });

    return await response.json() as React.FC;
}