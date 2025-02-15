# Running the project
First add your ```VITE_OPENAI_API_KEY=``` to the .env file. See .env.example for the correct format.

Then:

```
npm i
npm run dev
```

That should be it, vite will allocate a port and you can begin evaluating ai agents responses 🎉

# Design Decisions

LocalStorage is used to manage global state because it allows conversation history to persist across browser sessions. In a production environment, a backend service would handle conversation history, while React Context would be responsible for hydrating and managing the app state efficiently.

To maintain a consistent look and feel, I rendered loading and error states as temporary agent chat messages. These messages are automatically removed once a response is received or a new message is sent.

I refactored the OpenAI response handling into a reusable custom hook, keeping it decoupled from the rest of the system. This allows it to be easily reused in other components if needed.

I anticipate that users will rarely want to provide their own evaluation of responses, so I designed this feature to be subtle yet easily accessible.

I chose not to deploy this app to a hosted environment since it's a Single Page Application (SPA), which would expose the API key. However, I can demonstrate the deployment process in a demo if needed.

# If I had more time

- Implement a conversation quality summary component to provide users with insights on response effectiveness.
- Add user-behavior-driven tests to better mimic real interaction patterns.
- Introduce additional validation checks on user inputs for improved reliability.
- Enable users to create new chats and manage them via a side panel for better organization.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
