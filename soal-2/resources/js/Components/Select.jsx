import {clsx} from "clsx";
import React from "react";

export default function Select({label, className, children, errors, ...props}) {
    return(
        <div className={'mb-4'}>
            <label htmlFor="select" className="block text-sm text-gray-800 font-medium mb-2 dark:text-white">{label}</label>
            <select id="select"
                    {...props}
                    className={clsx(className,`py-3 px-4 pe-9 text-gray-900 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600`)}>
                {children}
            </select>
            {errors && (
                <small className='text-xs text-red-500'>{errors}</small>
            )}
        </div>
    )
}
