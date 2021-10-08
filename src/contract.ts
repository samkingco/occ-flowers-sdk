import { ethers } from "ethers";
import abi from "./abi.json";
import dotenv from "dotenv";
dotenv.config();

export const address = "0x5A876ffc6E75066f5ca870e20FCa4754C1EfE91F";
export const rpc = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC);
export const contract = new ethers.Contract(address, abi, rpc);
