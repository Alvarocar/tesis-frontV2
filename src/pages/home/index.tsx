import ExplainComponent from "./children/explain"
import OptionsComponent from "./children/options"
import PresentationComponent from "./children/presentation"

const HomePage = () => (
  <>
    <PresentationComponent />
    <ExplainComponent />
    <OptionsComponent />
  </>
)

export default HomePage