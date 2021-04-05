import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities'
import { define, h } from 'js-element'
import { Designer } from './designer'
import { Showcases } from './showcases'

// === App ===========================================================

export const App = define({
  name: 'sx-app'
})(() => {
  return () => (
    <Designer>
      <div slot="showcases">
        <Showcases />
      </div>
    </Designer>
  )
})
