
import React, { Component } from 'react';

const ConfigContext = React.createContext({
    conf: {},
    setConf: () => {},
})
class ConfigProvider extends Component {
    state = {
        conf: {},
    }
    setConf = (conf) => {
        this.setState((prevState) => ({ conf }))
    }

    render() {
        const { children } = this.props
        const { conf } = this.state
        const { setConf } = this
    
        return (
          <ConfigContext.Provider
            value={[
              conf,
              setConf,
            ]} >
            {children}
          </ConfigContext.Provider>
        )
      }
}

export default ConfigContext

export { ConfigProvider }