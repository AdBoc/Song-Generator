App with login, register feature. Can generate lyrics for Barbra Streisand song, 

Validation only on Frontend does not ensure safety. 

Storing jwt in local storage makes you vulnerable to xss. Someone can steal token.

Everything that is done in this project can be done in simplier way but actual aim was to learn hooks with redux.

REDUX VS HOOKS (citing article)
In my opinion, for low-frequency updates like locale, theme changes, user authentication, etc. the React Context is perfectly fine. But with a more complex state which has high-frequency updates, the React Context won't be a good solution. Because, the React Context will trigger a re-render on each update, and optimizing it manually can be really tough. And there, a solution like Redux is much easier to implement.

REACT DEVS about future of hooks and classes
We intend for Hooks to cover all existing use cases for classes, but we will keep supporting class components for the foreseeable future.
