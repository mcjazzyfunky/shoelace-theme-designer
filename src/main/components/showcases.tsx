import { define, h } from 'js-element'
import { HLayout, VLayout } from './layouts'
import * as Shoelace from '@shoelace-style/shoelace'

// === exports =======================================================

export { Showcases }

// === Showcases =====================================================

const Showcase = define({
  name: 'sx-showcase',
  slots: ['default'],
  styles: () => styles.showcase,

  props: class {
    title = ''
  }
})((p) => {
  return () => (
    <div class="base">
      <h3>{p.title}</h3>
      <slot />
    </div>
  )
})

const Showcases = define({
  name: 'sx-showcases'
})(() => {
  return () => (
    <div>
      <AlertShowcase />
      <AvatarShowcase />
      <BadgeShowcase />
      <ButtonShowcase />
      <IconShowcase />
    </div>
  )
})

// === showcases =====================================================

const AlertShowcase = define({
  name: 'sx-alerts-showcase',
  uses: [Shoelace.SlAlert, Shoelace.SlIcon]
})(() => {
  return () => (
    <Showcase title="Alerts">
      <sl-alert type="primary" open>
        <sl-icon slot="icon" name="info-circle"></sl-icon>
        <strong>This is super informative</strong>
        <br />
        You can tell by how pretty the alert is.
      </sl-alert>
      <br />
      <sl-alert type="success" open>
        <sl-icon slot="icon" name="check2-circle"></sl-icon>
        <strong>Your changes have been saved</strong>
        <br />
        You can safely exit the app now.
      </sl-alert>
      <br />
      <sl-alert type="info" open>
        <sl-icon slot="icon" name="gear"></sl-icon>
        <strong>Your settings have been updated</strong>
        <br />
        Some settings will take affect the next time you log in.
      </sl-alert>
      <br />
      <sl-alert type="warning" open>
        <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
        <strong>This will end your session</strong>
        <br />
        You will be logged out until you log in again.
      </sl-alert>
      <br />
      <sl-alert type="danger" open>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>Delete this file?</strong>
        <br />
        This is permanent, which means forever!
      </sl-alert>
    </Showcase>
  )
})

const AvatarShowcase = define({
  name: 'sx-avatar-showcase',
  uses: [Shoelace.SlAvatar]
})(() => {
  return () => (
    <Showcase title="Avatar">
      <HLayout>
        <sl-avatar shape="square"></sl-avatar>
        <sl-avatar shape="rounded"></sl-avatar>
        <sl-avatar shape="circle"></sl-avatar>
      </HLayout>
    </Showcase>
  )
})

const BadgeShowcase = define({
  name: 'sx-badge-showcase',
  uses: [Shoelace.SlBadge]
})(() => {
  return () => (
    <Showcase title="Badge">
      <HLayout>
        <sl-badge type="primary">Primary</sl-badge>
        <sl-badge type="success">Success</sl-badge>
        <sl-badge type="info">Info</sl-badge>
        <sl-badge type="warning">Warning</sl-badge>
        <sl-badge type="danger">Danger</sl-badge>
      </HLayout>
    </Showcase>
  )
})

const ButtonShowcase = define({
  name: 'sx-button-showcase',
  uses: [Shoelace.SlButton]
})(() => {
  return () => (
    <Showcase title="Button">
      <HLayout>
        <sl-button type="default">Default</sl-button>
        <sl-button type="primary">Primary</sl-button>
        <sl-button type="success">Success</sl-button>
        <sl-button type="info">Info</sl-button>
        <sl-button type="warning">Warning</sl-button>
        <sl-button type="danger">Danger</sl-button>
      </HLayout>
    </Showcase>
  )
})

const IconShowcase = define({
  name: 'sx-icon-showcase',
  uses: [Shoelace.SlIcon]
})(() => {
  return () => (
    <Showcase title="Icon">
      <HLayout style="font-size: 32px">
        <sl-icon name="exclamation-triangle"></sl-icon>
        <sl-icon name="archive"></sl-icon>
        <sl-icon name="battery-charging"></sl-icon>
        <sl-icon name="bell"></sl-icon>
        <sl-icon name="clock"></sl-icon>
        <sl-icon name="download"></sl-icon>
        <sl-icon name="file-earmark"></sl-icon>
        <sl-icon name="flag"></sl-icon>
        <sl-icon name="heart"></sl-icon>
        <sl-icon name="image"></sl-icon>
        <sl-icon name="lightning"></sl-icon>
        <sl-icon name="mic"></sl-icon>
        <sl-icon name="search"></sl-icon>
        <sl-icon name="star"></sl-icon>
        <sl-icon name="trash"></sl-icon>
        <sl-icon name="x-circle"></sl-icon>
      </HLayout>
    </Showcase>
  )
})

// === styles ========================================================

const styles = {
  showcase: `
    .base {
      color: var(--sl-color-black);
      margin: 10px 0 75px 0; 
    }

    h3 {
      font-weight: 400;
      font-family: var(--sl-font-sans);
      font-size: var(--sl-font-size-large);
    } 
  `
}
