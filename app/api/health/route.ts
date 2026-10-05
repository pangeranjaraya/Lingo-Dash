import {NextResponse} from 'next/server';export async function GET(){return NextResponse.json({ok:true,service:'LingoDash',version:'3.0.0',firebaseProject:'lingodash-2026'});}
