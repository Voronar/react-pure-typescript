/**
 * Test React component
 */
import * as React from 'react';

import { IStylesComponent, IPropsComponent, IStateComponent  } from './Component.h';

const styles: IStylesComponent = require('./Component.module.scss');

class Component extends React.Component<IPropsComponent, IStateComponent> {
  public render(): JSX.Element | null {
    return (
      <div className={styles.component} >blue component</div>
    );
  }
}

export default Component;
