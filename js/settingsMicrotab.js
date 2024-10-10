const settingsMicrotabStyle = {
  "color": "white",
  "font-size": "18px",
  "font-family": "monospace",
}

const settingsMicrotabBigStyle = {
  "color": "white",
  "font-size": "36px",
  "font-family": "monospace",
}

const settingsMicrotab = {
  buttonStyle: () => ({ 'color': 'white' }),
  unlocked: () => true,
  content: [
    ["blank", "25px"],

    ["row", [
      ["raw-html",
        () => "<button class=opt onclick=save()>Save</button>",
        settingsMicrotabStyle],
      ["raw-html",
        () => "<button class=opt onclick=toggleOpt('autosave')>Autosave</button>",
        settingsMicrotabStyle],
      ["raw-html",
        () => "<button class=opt onclick=hardReset()>HARD RESET</button>",
        settingsMicrotabStyle],
    ]],

    ["row", [
      ["raw-html",
        () => "<button class=opt onclick=exportSave()>Export to clipboard</button>",
        settingsMicrotabStyle],
      ["raw-html",
        () => "<button class=opt onclick=importSave()>Import</button>",
        settingsMicrotabStyle],
      ["raw-html",
        () => "<button class=opt onclick=toggleOpt('offlineProd')>Offline Prod</button>",
        settingsMicrotabStyle],
    ]],

    ["row", [
      ["raw-html",
        () => "<button class=opt onclick=switchTheme()>Change Theme</button>",
        settingsMicrotabStyle],
      ["raw-html",
        () => "<button class=opt onclick=toggleOpt('musicToggle'); needsCanvasUpdate = true>Toggle Music</button>",
        settingsMicrotabStyle],
      ["raw-html",
        () => "<button class=opt onclick=toggleOpt('toggleHotkey'); needsCanvasUpdate = true>Toggle Hotkeys</button>",
        settingsMicrotabStyle],
    ]],

    ["blank", "25px"],

    ["raw-html",
      () => "</td><td><div style=\"margin: 0 10px\"><input type=range id=volume name=Music Volume min=1 max=10 value=" + options.musicVolume + " oninput=updateMusicVolume()><br>",
      settingsMicrotabStyle],

    ["blank", "25px"],

    ["raw-html",
      () =>  "Volume: " + options.musicVolume,
      settingsMicrotabStyle],
    ["raw-html",
      () => "Autosave: " + options.autosave,
      settingsMicrotabStyle],
    ["raw-html",
      () => "Offline Production: " + options.offlineProd,
      settingsMicrotabStyle],
    ["raw-html",
      () => "Music Toggle: " + options.musicToggle,
      settingsMicrotabStyle],
    ["raw-html",
      () => "Hotkey Toggle: " + options.toggleHotkey,
      settingsMicrotabStyle],

    ["blank", "25px"],

    ["raw-html",
      () => "Playtime: " + formatTime(player.timePlayed),
      settingsMicrotabStyle],

    ["blank", "25px"],

    ["raw-html",
      () => "<a href=https://discord.gg/icecreamdude-s-incremental-games-850817562040467556>Join the Discord!</a>",
      settingsMicrotabBigStyle],

    ["blank", "25px"],

    ["raw-html",
      () => hotkey,
      settingsMicrotabStyle],

    ["blank", "25px"],

    ["raw-html",
      () => credits,
      settingsMicrotabStyle],

    ["blank", "25px"],

    ["raw-html",
      () => changelog,
      settingsMicrotabStyle],
  ]
}
