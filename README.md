## ALL WE NEED (DO NOT DELETE)

1. pages (folder) > contact.js (file)

## TASK

1. remove envy theme etc name and everything before final deployment
2. ContactForm.js e nodemailer er kaj kora lagbe
3. we need to correct blog dynamic url

## ISSUES

2. MHidden.js theke server error ashtese...and MHidden.js ta dashboard er moddhe {MHidden} eivabe import kora hosse. issue ta maybe ei jonnei hosse
3. Theme er font-family mis-match hoi gese. ThemeConfig er jonne..and maybe ThemeProvider er jonne => ThemeConfig er modde eita comment kore dilei sob thik {/_ <CssBaseline /> _/} solved

4. styles > global.css > ee css add kora hoini and eita \_app.js ee include oo korini...example ase E-Commerce-UAE project ee
5. dashboard layout ta render houyar aga ekta loader use korte hobe. na hoile, immediate render ee dashboard layout ta dekhte khub ee kharap lagtese
6. http://localhost:3000/dashboard/blog/list/ => eii route e getMorePosts error ase.

7. Unhandled Runtime Error
   TypeError: Failed to fetch

Source
components_App\Navbar.js (18:4) @ fetch

16 | console.log('log out clicked');
17 | const url = `http://localhost:8000/api/v1/auth/log-out/${loggedInUser?._id}`

> 18 | await fetch(url, {

     |    ^

19 | method: "POST",
20 | headers: {
21 | 'content-type': 'application/json',

eita ashtese, server off hoi gele ashtese...

8. <RootStyle title="Login | Minimal-UI"> eikhane Mimimual Ui ekdm last ee replace kore dibo boostingOn diye
9. AuthGuard e issue ase. ekta loader use korte parle valo hoi

10. public folder > images folder theke unnecessary sob image delete kore dite hobe

11. home page refresh dile || dashboard page refresh dile sob sidebar , components gula ekdm top - left side theke ashtese. ja khub ee baje lagtese.

12. login korar poreu page redirect hosse na. (solved)
13. jwt expiresTime rakhbo na. cancel kore dibo backend theke. jwtHelpers er moddhe ase
14. register + login sob ee hosse valo vabe. but password change kora pore, change holeu, password is not matched error ashtese. jeta big issue

## FUNCTIONAL PAGE WORK

1. Feedback Dashboard page => protected delete done, edit baki, image upload baki
2. Team Dashboard page =>
3. FAQ dashboard page => completely all done

## PROTECTED ROUTES

## ADMIN, SUPER ADMIN ROUTES

1. FAQ page is protected => <RoleBasedGuard accessibleRoles={['super admin', 'admin']}></RoleBasedGuard> && sidebar config also
2. Blog page is protected => <RoleBasedGuard accessibleRoles={['super admin', 'admin']}></RoleBasedGuard> && sidebar config also
3. Job page is protected => <RoleBasedGuard accessibleRoles={['super admin', 'admin']}></RoleBasedGuard> && sidebar config also
4. Service page is protected => <RoleBasedGuard accessibleRoles={['super admin', 'admin']}></RoleBasedGuard> && sidebar config also
5. Team page is protected => <RoleBasedGuard accessibleRoles={['super admin', 'admin']}></RoleBasedGuard> && sidebar config also
6. Project page is protected => <RoleBasedGuard accessibleRoles={['super admin', 'admin']}></RoleBasedGuard> && sidebar config also
7. Feedback page is protected => <RoleBasedGuard accessibleRoles={['super admin', 'admin']}></RoleBasedGuard> && sidebar config also

## USER ROUTES

1. User> list is protected
