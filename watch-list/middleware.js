const { createMiddlewareClient } = require("@supabase/auth-helpers-nextjs");
const { NextResponse } = require("next/server");


export async function middleware(req){
    const res=NextResponse.next();
    const supabase=createMiddlewareClient({req,res});
    
    const {data:{user }} =await supabase.auth.getUser();

    if(user && user.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/watch-list',req.URL))
    }
    if(!user && user.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/',req.URL))
    }
    return
}


