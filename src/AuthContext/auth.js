import React from 'react';
import {When} from 'react-if';

import { LoginContext } from './_context.js';

function Auth ({capability, children}) {

  const loginContext = React.useContext(LoginContext);

  const isLoggedIn = loginContext.loggedIn;
  const canDo = capability ? loginContext.can(capability) : true;
  const okToRender = isLoggedIn && canDo;

  return (
    <When condition={okToRender}>
      {children}
    </When>
  );
  
}

export default Auth;