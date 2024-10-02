import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import RouteCmp from "./Routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            trackBg: "red",
          },
        },
      }}
    >
      <Router>
        <RouteCmp />
      </Router>
    </ConfigProvider>
  );
}

export default App;
