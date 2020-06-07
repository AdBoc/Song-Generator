Walidacja na forncie nie zapewnia bezpiecznstwa calej apki!

CODE MADE FOR THIS PROJECT IS A HUGE OVERKILL
Everything can be done in very simplier way but then i would've learn that much about hooks

REDUX VS HOOKS
in my opinion, for low-frequency updates like locale, theme changes, user authentication, etc. the React Context is perfectly fine. But with a more complex state which has high-frequency updates, the React Context won't be a good solution. Because, the React Context will trigger a re-render on each update, and optimizing it manually can be really tough. And there, a solution like Redux is much easier to implement.

REACT DEVS about future of hooks
We intend for Hooks to cover all existing use cases for classes, but we will keep supporting class components for the foreseeable future.

v 0.1 - created project with CRA, added routes, added login and logout context
v 0.1.1 - small change in README
v 0.5 - added player and download button to home
v 0.5.1 - small fixes
v 0.5.2 - new put request to change user data
v 0.6 - token is now taken from state, small changes in reducer, requests in home are now in sonService
v 0.6.1 - button is not rendered if there is no song
v 0.6.9 - moved requests to apiService.js, changed navBar, fixed update user and noSong now returns 404
v 0.7 - fixed login and username problem
v 0.7.5 - added css and max-length counter to textField
v 0.7.9 - added simple media queries, moved setToken to login reducer, moved login to apiService, added Errors that login or email is already taken,  

ToDo:
weryfikacja pol
cancelling requests
api zwraca dane uzytkownika dla usera (nowy kod dla user)
dark mode

jeden button jest napisany kilka razy, kolory i zmienne mozna gdzies trzymac
Jesli jest 401 unauthorized to sprawdza czy jest token lub robi logout (w api axios post w przypadku catcha z 401 jest czyszczenie storage)
Jak odpowiedzia jest error w addnewSong to DonwloadButton nie powinien sie pojawiac albo dzialac

ZŁY KOD:
Errory z backendu sa console logowane
localStorage.clear(); i window.location.reload(true); znajdujacy sie w apiService
history.push('/') w register