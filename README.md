CODE MADE FOR THIS PROJECT IS A HUGE OVERKILL

REDUX VS HOOKS
in my opinion, for low-frequency updates like locale, theme changes, user authentication, etc. the React Context is perfectly fine. But with a more complex state which has high-frequency updates, the React Context won't be a good solution. Because, the React Context will trigger a re-render on each update, and optimizing it manually can be really tough. And there, a solution like Redux is much easier to implement.

v 0.1 - created project with CRA, added routes, added login and logout context 
