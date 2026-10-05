'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {onAuthStateChanged,User} from 'firebase/auth';
import {auth} from '../lib/firebase';
import {finishGoogleRedirect,saveUser} from '../lib/auth';
type Ctx={user:User|null;loading:boolean};const C=createContext<Ctx>({user:null,loading:true});
export function AuthProvider({children}:{children:React.ReactNode}){const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);useEffect(()=>{let mounted=true;finishGoogleRedirect().catch(()=>null);const unsub=onAuthStateChanged(auth,async u=>{if(!mounted)return;setUser(u);setLoading(false);if(u)await saveUser(u).catch(()=>{});});return()=>{mounted=false;unsub();}},[]);return <C.Provider value={{user,loading}}>{children}</C.Provider>}
export const useAuth=()=>useContext(C);
