
import React, { Component } from 'react';

export const PerformanceContext = React.createContext({
    perf: {},
    setPerf: () => {},
})
class PerformanceProvider extends Component {
    state = {
      perf: {},
    }
    setPerf = (perf) => {
        this.setState((prevState) => ({ perf }))
    }

    render() {
        const { children } = this.props
        const { perf } = this.state
        const { setPerf } = this
    
        return (
          <PerformanceContext.Provider
            value={[
              perf,
              setPerf
            ]} >
            {children}
          </PerformanceContext.Provider>
        )
      }
}

//export default PerformanceContext

export { PerformanceProvider }