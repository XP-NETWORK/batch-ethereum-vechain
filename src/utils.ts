import { config } from "dotenv"; config();

/**
 * Ensures the environment variables are populated
 * @param key - the environment key
 * @param defaultValue - the default value for the key
 * @returns the value if it exist in the environment
 */
export function getEnv(
    key: string,
    optional:boolean=false,
    defaultValue?: string,
) {
    let val = process.env[key];
    if (val === undefined) {
        val = defaultValue;
    }
    if (!val && !optional) {
        throw new Error(
            `\nEnvironment variable ${key}= is not defined.\nThe Value must be set in the .env file.\n`
        );
    }
    return val;
}