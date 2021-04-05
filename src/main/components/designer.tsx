import { define, createRef, createEvent, h } from 'js-element'
import { Listener, TypedEvent } from 'js-element'
import { useEffect } from 'js-element/hooks'
import { microstore } from 'js-element/utils'
import { useEmitter, useStyles } from 'js-element/hooks'
import * as Shoelace from '@shoelace-style/shoelace'

import { HLayout, VLayout } from './layouts'
import { defaultTheme } from '../default-theme'
import { Theme } from '../types'

// === exports =======================================================

export { Designer }

// === types ==========================================================

type Customizing = {
  readonly colorPrimary: string
  readonly colorInfo: string
  readonly colorSuccess: string
  readonly colorWarning: string
  readonly colorDanger: string
  readonly darkMode: boolean
}

// === store ==========================================================

const [useStoreProvider, useStore] = microstore(() => ({
  customizing: {
    colorPrimary: defaultTheme['color-primary-500'],
    colorSuccess: defaultTheme['color-success-500'],
    colorInfo: defaultTheme['color-info-500'],
    colorWarning: defaultTheme['color-warning-500'],
    colorDanger: defaultTheme['color-danger-500'],
    darkMode: false
  },

  showExportDrawer: false,

  customize(values: Partial<Customizing>) {
    Object.assign(this.customizing, values)
  }
}))

// === components =====================================================

const Designer = define({
  name: 'sx-designer',
  slots: ['showcases']
})(() => {
  useStoreProvider()

  useStyles(`
    :host {
      position: absolute;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 0;
      overflow: hidden;
    }

    .header {
      padding: 3px 10px;
      height: 50px;
      width: 100%;
      box-sizing: border-box;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    .content {
      position: relative;
      display: flex;
    }
    
    .sidebar {
      width: 300px;
      height: 100%;
      border-width: 0 1px 0 0;
      border-style: solid;
      border-color: var(--sl-color-gray-200);
      padding: 12px 20px;
      box-sizing: border-box;
    }

    .showcases-container {
      position: absolute;
      bottom: 0;
      display: flex;
      bottom: 0;
      top: 53px;
      left: 300px;
      right: 0;
      overflow: hidden;
    }

    .showcases {
      padding: 10px 30px;
      height: 100%;
      width: 100%;
      overflow: scroll;
      align-self: stretch;
    }

    .headline {
      font-weight: 600;
      font-size: var(--sl-font-size-medium);
    }

    .dark-mode {
      padding-left: 0.5em;
    }
  `)

  const store = useStore()

  return () => {
    const customizing = store.customizing

    const createColorListener = (type: string) => {
      return (ev: any) => {
        const newCustomizing: any = { ...customizing }
        newCustomizing[type] = ev.detail.value
        store.customize(newCustomizing)
      }
    }
    return (
      <div class="base sl-theme-designer">
        <ThemeExportDrawer />
        <table style="width: 100%; height: calc(100% - 53px); position: absolute;">
          <thead style="height: 30px">
            <tr>
              <th colSpan={2} style="text-align: left">
                <div class="header">
                  <DesignerHeader
                    onExport={() =>
                      (document.getElementById('drawer') as any).open()
                    }
                  />
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="height: 100%">
                <div class="sidebar">
                  <VLayout>
                    <h3 class="headline">Basic theme colors</h3>
                    <ColorField
                      label="Primary color"
                      value={customizing.colorPrimary}
                      onColorChange={createColorListener('colorPrimary')}
                    />
                    <ColorField
                      label="Info color"
                      value={customizing.colorInfo}
                      onColorChange={createColorListener('colorInfo')}
                    />
                    <ColorField
                      label="Success color"
                      value={customizing.colorSuccess}
                      onColorChange={createColorListener('colorSuccess')}
                    />
                    <ColorField
                      label="Warning color"
                      value={customizing.colorWarning}
                      onColorChange={createColorListener('colorWarning')}
                    />
                    <ColorField
                      label="Danger color"
                      value={customizing.colorDanger}
                      onColorChange={createColorListener('colorDanger')}
                    />
                    <h3 class="headline">Dark mode</h3>
                    <HLayout class="dark-mode">
                      <sl-switch value={customizing.darkMode} />
                      <label>Enable dark mode</label>
                    </HLayout>
                  </VLayout>
                </div>
              </td>
              <td>
                <div class="showcases-container">
                  <div class="showcases">
                    <slot name="showcases" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
})

const DesignerHeader = define({
  name: 'sx-designer--header',
  uses: [Shoelace.SlIcon, Shoelace.SlButton],
  props: class {
    onExport?: Listener<TypedEvent<'sx-export'>>
  }
})((p) => {
  useStyles(`
    .base {
      display: flex;
      align-items: center;
      font-family: var(--sl-font-sans);
    }

    .brand {
      font-weight: normal;
      font-size: var(--sl-font-size-large);
      background-image: url('https://www.svgrepo.com/show/34997/palette.svg');
      background-repeat: no-repeat;
      padding: 0 0 0 40px;
      flex-grow: 1;
    }
  `)

  const emit = useEmitter()

  const onExportClick = () => {
    emit(createEvent('sx-export'), p.onExport)
  }

  return () => (
    <div class="base">
      <div class="brand">Shoelace Theme Designer</div>
      <div class="actions">
        <sl-button type="primary" onclick={onExportClick}>
          Export Theme
        </sl-button>
      </div>
    </div>
  )
})

const ColorField = define({
  name: 'sx-designer--color-field',
  uses: [Shoelace.SlColorPicker, Shoelace.SlInput],
  props: class {
    label?: string
    value?: string
    onColorChange?: Listener<TypedEvent<'sx-color-change', { value: string }>>
  }
})((p) => {
  useStyles(`
    label {
      width: 7em;
      height: 2.3em;
      padding: 0 0 0 0.5em;
    }

    span {
      width: 4.5em;
    }

    sl-color-picker {
      margin-top: -4px;
    }
  `)

  const emit = useEmitter()

  const onChange = (ev: any) => {
    emit(
      createEvent('sx-color-change', { value: ev.target.value }),
      p.onColorChange
    )
  }

  return () => (
    <HLayout>
      <label>{p.label}:</label>
      <span>{p.value}</span>
      <sl-color-picker
        format="hex"
        size="small"
        value={p.value}
        onsl-change={onChange}
      ></sl-color-picker>
    </HLayout>
  )
})

const ThemeExportDrawer = define({
  name: 'sx-designer--theme-export-drawer',
  uses: [Shoelace.SlTab, Shoelace.SlTabGroup, Shoelace.SlTabPanel],
  props: class {
    open = false
  }
})((p) => {
  useStyles(`
    pre {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right 0;
      height: 500px;
      width: 100%;
      overflow: auto; 
      border: 1px solid var(--sl-color-gray-400);
    }
  `)

  const drawerRef = createRef<any>()

  const closeDrawer = () => drawerRef.current!.hide()

  useEffect(
    () => drawerRef.current[p.open ? 'show' : 'hide'](),
    () => [p.open]
  )

  return () => (
    <sl-drawer
      id="drawer"
      ref={drawerRef}
      label="Export theme"
      class="drawer-overview"
      style="height: 100%; border: 1px solid red;"
    >
      <sl-tab-group>
        <sl-tab slot="nav" panel="code">
          Code
        </sl-tab>
        <sl-tab slot="nav" panel="json">
          JSON
        </sl-tab>
        <sl-tab-panel name="code">
          <pre>
            blalb bla bla
            <br />
            blablaxxx
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blalb bla bla
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
            blablaxxx
            <br />
          </pre>
        </sl-tab-panel>
        <sl-tab-panel name="json">
          <pre></pre>
        </sl-tab-panel>
      </sl-tab-group>
      <sl-button slot="footer" type="primary" onclick={closeDrawer}>
        Close
      </sl-button>
    </sl-drawer>
  )
})
