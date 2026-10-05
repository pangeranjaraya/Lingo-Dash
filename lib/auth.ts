import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, User } from 'firebase/auth';
import { auth } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
export function isEmbeddedBrowser(){ if(typeof navigator==='undefined') return false; const ua=navigator.userAgent.toLowerCase(); return ua.includes('wv') || ua.includes('; wv)') || ua.includes('instagram') || ua.includes('fbav') || ua.includes('fban'); }
export async function saveUser(user:User, extra:Record<string,unknown>={}){await setDoc(doc(db,'users',user.uid),{uid:user.uid,email:user.email||'',displayName:user.displayName||extra.username||'Learner',photoURL:user.photoURL||'',providerIds:user.providerData.map(p=>p.providerId),updatedAt:serverTimestamp(),createdAt:serverTimestamp(),...extra},{merge:true});}
export async function googleLogin(){const provider=new GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'}); if(isEmbeddedBrowser()){ throw new Error('EMBEDDED_BROWSER'); } if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){await signInWithRedirect(auth,provider);return null;} const result=await signInWithPopup(auth,provider);await saveUser(result.user);return result.user;}
export async function finishGoogleRedirect(){const result=await getRedirectResult(auth);if(result?.user){await saveUser(result.user);}return result?.user??null;}
export async function register(email:string,password:string,username:string){const result=await createUserWithEmailAndPassword(auth,email,password);await updateProfile(result.user,{displayName:username});await saveUser(result.user,{username});return result.user;}
export async function login(email:string,password:string){const result=await signInWithEmailAndPassword(auth,email,password);await saveUser(result.user);return result.user;}
export async function resetPassword(email:string){return sendPasswordResetEmail(auth,email);}
export async function logout(){return signOut(auth);}
