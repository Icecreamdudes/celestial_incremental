# The Modding Tree changelog:

### v2.6.6.2 = 9/9/21
- nodeStyle can now be used to set fonts.

### v2.6.6.1 = 9/8/21
- Fixed options not updating when new ones are added.

### v2.6.6 - 9/7/21
- Added option for shift-clicking nodes toggling their tooltips.
- Fixed NaN check for setting Decimal values with text boxes.
- Added display-image, h-line, and v-line to documentation.
- Fixed an issue with subtab glow colors.
- Locked/hidden subtabs can't cause node glowing.
- Fixed being able to buy upgrades on deactivated layers.
- Updated break_eternity library.
- Cleaned up buyable/clickable code.

### v2.6.5.1 - 7/13/21
- Fixed offline production more.

### v2.6.5 - 7/7/21
- Fixed offline production.
- Fixed formatting for small negative numbers.
- Fixed divide by zero when a 0-second tick occurs.
- "deactivated" now also affects achievement/milestone unlocking.
- Locked challenges cannot be entered.
- Fixed a bug with subtab glow colors.

### v2.6.4.2 - 6/17/21
- Fixed a bug with the endgame screen.
- Fixed hotkey-related crash.
- Fixed resetting not working correctly.

### v2.6.4 - 6/17/21
- The game now autosaves before closing, if autosave is on. (Thank you to thepaperpilot for this!)
- More Anti-NaN safety.
- Fixed challenges glowing from countsAs.
- Improved tooltip centering (thanks to Scarlettt!)
- canReset now works properly for non-custom layers.
- Fixed baseAmount being set to 0 even when a layer resets nothing.
- Fixed centering on tooltips.
- Changed some default values on startup to prevent potential issues.
- Cleaned up resetting.

### v2.6.3 - 6/11/21
- Added better support for using multiple layer files and similar. See modFiles in modInfo.
- The demo now has each layer in its own file as well.

### v2.6.2.2 - 6/10/21
- Fixed an error message regarding popup.css.

### v2.6.2.1 - 6/10/21
- Fixed a visual bug with milestones.

### v2.6.2 - 6/10/21
- Broke up style.css into many files to make it easier to find and customize what matters. If you already have custom CSS, keep that and ignore the new ones maybe?
- Added buyable and clickable trees.
- Added optional tooltips to upgrades, buyables, clickables, milestones, and gridables.
- Fixed the passiveGeneration display.
- Fixed "marked" feature.
- doReset now will function on non-numeric rows besides "side".

### v2.6.1 - 6/7/21
- Added global background style to mod.js.
- Tree branches can have custom line widths.
- If an upgrade has both canAfford and cost, it checks both. (So you can use canAfford for other things)
- Releasing a held buyable/clickable with onHold doesn't click it again.
- Fixed hard resetting while NaN'ed and exporting NaN saves for debugging.
- Attempt to fix buttons sometimes not updating.
- Added "instant" feature for bars. (not useful for most people)
- Improvements to theme code, partially by Cubedey.

### v2.6.0.1 - 6/4/21
- Removed excess NaN alerts (now only checks player, not temp).
- Fixed background images covering up tree branches.

# v2.6: Fixed Reality - 6/3/21
- Fixed issues with NaN checking. The game also will not save if the save is broken.
- Added a drop-down menu component!
- Added upgrade-tree component!
- Options are now saved separately, and not affected by hard resetting or importing saves.
- Fixed demo.html
- Fixed branches not working on the right tab.
- Fixed background color not working on the left tab.
- Fixed branches not updating when tree tab is not shown.
- You can now use "this" in tabFormat!
- Added per-row displaying for achievements, challenges, milestones, grids, buyables, and clickables. THIS WILL BREAK BUYABLES/CLICKABLES THAT PREVIOUSLY USED THEIR TABFORMAT ARGUMENT FOR SIZE.
- Added onComplete for milestones.
- Added addBuyables.
- The prestige/sec display now shows non-whole numbers.
- resetsNothing now works immediately on a reset that enables it.
- Made the star on maxed challenges larger.

- diff can no longer be negative.
- Fixed challenges with no currencyDisplayName using "points" instead of the mod's pointsName.
- inChallenge no longer can return undefined.
- Fixed certain things skipping negative rows (now they are treated like non-numeric rows, and don't appear in the tree still).
- Things are 0.2% more optimized.
- Fixed problems in the documentation.
- Added more customization to the "mark" component (but not an easy way to access it)


### v2.5.11.1 - 5/27/21
- Fixed issues caused when the tree tab is disabled.

### v2.5.11 - 5/27/21
- Finished part 1 of the "making a mod" tutorial.
- The challenge that you are currently in is highlighted, and will not be hidden if "hide completed challenges" is on and it is already completed.
- Added leftTab, which makes a layer use the left tab instead of the right one (good for trees-within-trees and such)
- Added startNavTab, which lets you choose which tab starts out on the left side.
- Fixed the infobox not appearing in default tabFormat.
- Fixed upgrade/buyable layering when they are hovered over.
- Fixed devSpeed being applied twice.

### v2.5.10.2 - 5/24/21
- Fixed some things in the tree tab not being clickable.

### v2.5.10.1 - 5/23/21
- Actually fixed the tooltip issue.

### v2.5.10 - 5/22/21
- Tooltips can now show over the top overlay again.
- Tweaked number formatting (e1000's keep the decimal places on the mantissa.)
- Fixed text on two settings buttons not changing.
- Started making a new tutorial.

### v2.5.9.2 - 5/19/21
- Fixed many issues with things not updating.

### v2.5.9.1 - 5/18/21
- Made text inputs never give NaNs.

### v2.5.9 - 5/18/21
- Fixed issue when using text inputs for Numbers.
- Added particle color feature.
- Particle speed and dir are updated as it moves.
- Added setSpeed and setDir for particles.
- Added more trig functions.

### v2.5.8 - 5/17/21
- Added makeShinies, which creates a stationary particle in a random spot.
- Bars will visually update more quickly.
- Fixed a major particle-related issue.
- Fixed autoUpgrade.
- Fixed a minor visual issue with tree nodes.

### v2.5.7 - 5/15/21
- Added a particle system! Not only can it be used for visual effects, but particles can interact with the mouse. They could be used to create golden cookies or collectables, for example.
- Added marked feature to buyables, clickables, and challenges. By default, stars multi-completion challenges when maxed.
- Added 'deactivated' feature to layers, which disables many features.
- Improved number formatting slightly.

### v2.5.6 - 5/14/21
- You can now use non-numeric ids for upgrades, buyables, etc.
- Fixed an exploit that let you buy an extra buyable.
- Moved basic getter/setter functions to easyAccess.js.

### v2.5.5.2 - 5/12/21
- Fixed a major issue with buyables.
- Fixed a variety of tabFormat-related issues.
- Fixed commas appearing in decimal places (thanks to pg132!)

### v2.5.5.1 - 5/12/21
- Fixed clickables.

### v2.5.5 - 5/12/21
- Added grids! They are a grid of buttons which behave the same, but have their own data. Good for inventory grids, map tiles, and more!
- Added "marked" feature to add a mark to a node. Can be an image instead of a star. (Originally by Jacorb)
- Added "layer-proxy" component that lets you use components from another layer.
- Added the ability to display non-whole numbers in main-display.

### v2.5.4 - 5/10/21
- Added a setting to always use single-tab mode.
- Added directMult, which multiplies prestige gain after exponents and softcaps. It actually multiplies gain for static layers.
- Added onEnter and onExit for challenges.
- Improved displaying numbers between 0.0001 and 0.1.
- Added documentation on how gainMult/Exp work for static layers.
- Fixed a visual issue on mobile, thanks to thepaperpilot.
- Improved documentation in general.

### v2.5.3 - 5/8/21
- Improved performance of tab formats and bars.
- Respec confirmation settings are now kept on resets.
- Improved compatibility with older browsers.
- Fixed missing pixel on vertical bars.

### v2.5.2.1 - 5/7/21
- Fixed microtabs making layers highlight incorrectly.

### v2.5.2 - 5/7/21
- Added glowColor for subtabs.
- Improved the display for extremely small numbers.
- Fixed issues in the buyable docs.

### v2.5.1 - 5/7/21
- Fixed dynamic things in tabFormat not updating.

## v2.5: Dreams Really Do Come True - 5/7/21
- Optimizations, hopefully a significant amount.
- Added OOM/s point gen display at high values (thanks to Ducdat!)
- Only one tab will display if the window is not wide enough (also thanks to Ducdat!)
- Holding down a buyable's button now buys it continuously.
- New milestone setting will also show the most recently unlocked milestone. (Also renamed all settings to be clearer)
- Added an onHold feature for clickables.
- Layer nodes will be highlighted even if the player is on the same tab.
- Added customizable node glowColor.
- Added buyable purchaseLimit.
- Amount is automatically supplied to buyable cost and effect functions.
- Locked (not yet visible) milestones no longer take up space. Also fixed hidden milestones taking a tiny bit of space.
- Re-centered respec buttons.
- Force-displayed tooltips are not hidden by resets.
- Added formatting support for very small numbers. Disabled in most places by default because rounding errors might cause issues. Access it with formatSmall, or enable it globally by adding "allowSmall: true" to modInfo.


### v2.4.1 - 4/29/21
- A number of minor fixes, many thanks to thepaperpilot.
- The respec confirmation checkbox is now part of the respec-button component.
    (This also fixes the checkbox appearing when there is no respec button)
- Added a few undocumented changes to the 2.4 changelog (the two at the bottom)

## v2.4: Rationalized Edition - 4/29/21
- Completely reworked tooltips. Shift-click a node to force its tooltip to stay displayed. (And hopefully finally fixed flickering!)
- Added text-input and slider components.
- Added the ability to toggle respec confirmations.
- Added custom respec confirmation messages.
- The red layer highlight will not appear before a layer is unlocked.
- Added unlocking hotkeys.
- You no longer need to supply 'rows' and 'cols' for any Big Features.
- Node symbols can use HTML.
- Added documentation for the respec button.
- Added prestigeNotify to subtabs, and prestigeNotify in subtabs also highlights the layer node.
- The version number no longer contains special characters or irrational numbers.

- Added ctrlDown and shiftDown variables.
- Tooltips now use HTML (this means you need to replace any newlines with <br>)


### v2.π.1 - 4/7/21
- Fixed formatting for some larger numbers.
- Upgrades will expand if there is too much text to display. 
- Fixed styling challenges.
- No longer attempts to display a base currency when there is none.

## v2.π: Incrementally Updated - 2/5/21
- Performance improvements.
- Fixed tooltips overlapping with the top display.
- Clicking a popup dismisses it immediately.
- Added support for bulk challenge completions.
- "Best" is updated automatically.
- Fixed keeping Decimal values on reset.
- Code reorganization and style improvements by fudo.


### v2.3.5 - 12/21/20
- Added resetTime, which tracks the time since a layer prestiged or was reset.
- A layer node will be highlighted red if one of its subtabs is highlighted red.
- Fixed issues with keeping challenges, buyables, and clickables on reset.
- Improved the unlocking of custom layers.
- Other minor fixes.

### v2.3.4 - 12/16/20
- Added a node image feature.
- Resource display now always shows the amount of the currency the layer's gain is based on.
- Added spacing between tree nodes.
- Another attempt to fix tooltip flickering.

### v2.3.3 - 12/13/20
- Fixed the first node in a row always taking up space.
- layerShown is now optional.
- All prestige types can now use features for custom prestige types.

### v2.3.2 - 12/13/20
- Fixed achievement/milestone popups.

### v2.3.1 - 12/12/20
- Another attempt to fix flickering tooltips.
- The "this" keyword should work everywhere except tabFormat arrays (although I may have missed some things).
- Fixed tree branches not updating when scrolling on the right-side tab.
- Fixed a spacing issue when a node's symbol is ""
- Removed some old, unneeded files.

## v2.3: Cooler and Newer Edition - 12/10/20
- Added achievement/milestone popups (thank you to Jacorb for this contribution!)
- The changelog tab is back, and can be set in mod.js.
- Layer nodes and respec buttons will not be clicked by pressing "enter".
- Possible fix for flickering tooltips and strange transitions.
- The victory screen text is configurable.
- Added image and textStyle features to achievements.
- Added an argument to use specific rows in an "upgrades" component.
- Fixed the comma appearing in the main display when there was no effectDescription
- Added the ability to easily make a tab that is a collection of layers in subtabs.
- Improved spacing for embedding layers with subtabs into subtabs.


### v2.2.8 - 12/03/20
- Double-clicking a layer node brings you to the main subtab for that layer.
- Attempted to fix challenges visually updating a different way.
- Added a softcap function for use in formulas.
- Added displayRow feature, which lets layers be shown somewhere separate from where they are in the reset order (e.g. side layers)
- Fixed autoupgrade issue.

### v2.2.7 - 11/30/20
- Added autoUpgrade feature.
- resource-display now shows resource gain per second if passiveGain is active.
- Fixed formatting issues on some large numbers.
- Better support for using classed objects in player and in layers/tmp.
- Made hard resetting more effective.
- Removed Herobrine from getStartClickables.

### v2.2.6 - 11/30/20
- Added goalDescription for challenges and made the new "canComplete" system the standard.
- Another attempt to fix challenges not visually updating.
- Fixed side layers not appearing.
- Fixed getStartClickables again.

### v2.2.5 - 11/29/20
- Added features for overriding the displays and costs/goals of upgrades and challenges to make them fully custom.
- best, total, and unlocked are always automatically added to layerData (but best and total will only display if you add them yourself).
- Fixed getStartClickables.

### v2.2.4 - 11/28/20
- Added softcap and softcapPower features (for Normal layers)
- Offline time limit and default max tick length were fixed (previously the limits were 1000x too large)
- Added fixOldSaves.
- You can use HTML in main-display.
- Fixed a number of minor oddities.

### v2.2.3 - 11/28/20
- Layers will be highlighted if you can finish a challenge.
- The "can complete challenge" color now overrides the "already completed" color.
- Button nodes now work as side "layers".
- Setting a tooltip to "" hides it entirely.

### v2.2.2 - 11/22/20
- Fixed right half of the screen being unclickable in some circumstances.
- Fixed tree branches being offset.
- Fix to lastSafeTab.

### v2.2.1 - 11/7/20
- Added a small highlight to layers you can meaningfully prestige on.
- Added passiveGeneration and autoPrestige features to standardize prestige automation. (The old ways still work, but the new ones work better with other things)
- Improved milestones visually a bit.
- "best" and "total" are now only displayed if present in startData.
- Fixed issues with things not updating visually. (Thank you to to Jacorb!)
- Side layers and button nodes can now be highlighted.
- Updated docs on the new tree-related features.

## v2.2: Uprooted - 11/7/20
- You can now embed a layer inside of a subtab or microtab!
- Added support for hiding or reformatting the tree tab 
- Added non-layer button nodes
- Added shouldNotify to subtab/microtab buttons. (You can make them highlighted)
- Added commas to large exponents.
- Upgrades now only show "currently" if they have an effectDisplay (so not for constant effects).
- Achievements are part of the default tab format.
- NaN is now handled more intelligently.
- Renamed files, and moved less relevant ones to another folder.
- The "hide completed challenges" setting now only hides challenges at max completions.
- Thank you to thepaperpilot for fixing errors in docs and improving the infobox appearance!
- Many other minor fixes.


### v2.1.4 - 10/25/20
- Added an infobox component. Thank you to thepaperpilot for this contribution!
- Layer type is now optional, and defaults to "none".
- Improved the look of bars and tab buttons.
- Improved spacing between layer nodes (also thanks to thepaperpilot!)
- Fixed the "blank" component breaking if only specifying the height.
- Fixed some numbers not displaying with enough digits.
- Made a few more things able to be functions.
- A few other minor fixes.

### v2.1.3.1 - 10/21/20
- Fixed the update function.

### v2.1.3 - 10/21/20
- gainMult and gainExp are now optional.
- Layer unlocking is now kept on reset.
- Game should start up faster.
- Layer updates now have a determined order and starts with earlier-rowed layers.
- Automation now has a determined order and starts with later-rowed layers.
- Fixed issues with resetting clickables and challenges.
- Commas should no longer appear in the decimal places of a number.
- Fixed potential issue in displaying the tree.

### v2.1.2 - 10/19/20
- Added buyUpgrade function (buyUpg still works though)
- Added author name to modInfo.
- Fix to crash caused when the name of a subtab or microtab is changed.
- Fixes to outdated information in docs.
- Improvements to Discord links.
- Thank you to thepaperpilot for contributing to this update!

### v2.1.1 - 10/17/20
- Added resource-display component, which displays the base currency for the prestige layer, as well as the best
    and/or total of this layer's prestige currency.
- Fixed the value for the base currency not updating in resource-display.

## v2.1: We should have thought of this sooner! - 10/17/20
- Moved most of the code users will want to edit to mod.js, added documentation for it.
    - Specifically, modInfo, VERSION, canGenPoints, getPointGen, and maxTickLength
- Added getStartPoints()
- Added the ability to store non-layer-related data
- Added the ability to display more things at the top of the tree tab below points.
- Made the endgame condition customizable
- Added "sell one" and "sell all" buttons for buyables.
- Moved the old "game" to demo.js, and replaced it with a minimal game that won't cause issues when edited.
- Fixed issues with version number
- Fixed number formatting issue making things like "10e9" appear.


### v2.0.5 - 10/16/20
- Made more features (including prestige parameters) able to be dynamic.
- Layer nodes can be hidden but still take up space with "ghost" visibility
- Added clickableEffect for real.
- Fixed some visual issues with bars.
- A few other minor tweaks and improvements.

### v2.0.4 - 10/16/20
- Fixed HTML on buttons interfering with clicking on them.

### v2.0.3 - 10/16/20
- Fixed hotkeys not displaying in info.
- Fixed the game supressing all external hotkeys.
- You can use more things as currencies for upgrade costs and challenge goals using currencyLocation.
- Added maxTickLength, which can be used to prevent offline time or tab-switching from breaking time-limit based mechanics.
- Made buyable respec buttons and clickable "master" buttons their own components, and gave them a hide/show feature.
- Added a general "tooltip" feature for achievements.

### v2.0.2 - 10/15/20
- Branches are now dynamic (they can be functions).
- Fixed a crash related to offline time.
- Fixed links being too wide.

### v2.0.1 - 10/15/20
- Fixed side layers appearing multiple times.

## v2.0: The Pinnacle of Achievement Mountain - 10/15/20
- Added progress bars, which are highly customizable and can be horizontal or vertical!
- Added "side layers", displayed smaller and off to the side, and don't get reset by default.
    They can be used for global achievements and statistics. Speaking of which...
- Added achievements!
- Added clickables, a more generalized variant of buyables.
- Almost every value in layer data can be either a function or a constant value!
- Added support for multiple completions of challenges.
- Added "none" prestige type, which removes the need for any other prestige-related features.
- The points display and other gui elements stay at the top of the screen when the tree scrolls.
- Added getter/setter functions for the amounts and effects of most Big Features
- Moved modInfo to game.js, added a spot in modInfo for a Discord link, changelog link.
    Also added a separate mod version from the TMT version in VERSION.
- Tree structure is based on layer data, no index.html editing is needed.
- Tmp does not need to be manually updated.
- You don't have to have the same amount of upgrades in every row (and challs and buyables)
- "unlocked" is optional for all Big Components (defaults to true).
- All displays will update correctly.
- Changelog is no longer in index.html at all.
- Generation of Points now happens in the main game loop
- Changed the reset functions to make keeping things easier
- Renamed many things to increase readability (see the list in the link below)
- Improved documentation based on feedback

  [For a full list of changes to the format and functionality of existing things, click here.](2.0-format-changes.md)



### v1.3.5:

- Completely automated convertToDecimal, now you never have to worry about it again.
- Branches can be defined without a color id. But they can also use hex values for color ids!
- Created a tutorial for getting started with TMT and Github.
- Page title is now automatically taken from mod name.

### v1.3.4 - 10/8/20

- Added "midsection" feature to add things to a tab's layout while still keeping the standard layout.
- Fix for being able to buy more buyables than you should.

### v1.3.3 - 10/7/20
- Fix for the "order of operations" issue in temp.

### v1.3.1 - 10/7/20

- Added custom CSS and tooltips for Layer Nodes.
- Added custom CSS for upgrades, buyables, milestones, and challenges, both individually and layer-wide.
- You can now use HTML in most display text!
- You can now make milestones unlockable and not display immediately.
- Fixed importing saves, and issue with upgrades not appearing, and probably more.
- Optional "name" layer feature, used in confirmation messages.

## v1.3: Tabception... ception! - 10/7/20

- Added subtabs! And also a Micro-tab component to let you make smaller subtab-esque areas anywhere.
- Added a "custom" prestige formula type, and a number of features to support it.
- Added points/sec display (can be disabled).
- Added h-line, v-line and image-display components, plus components for individual upgrades, challenges, and milestones.
- Added upgEffect, buyableEffect, and challEffect functions.
- Added "hide completed challenges" setting.
- Moved old changelogs to a separate place.
- Fixed hasMilestone and incr_order.
- Static layers now show the currency amount needed for the next one if you can buy max.


### v1.2.4 - 10/4/20

- Layers are now highlighted if you can buy an upgrade, and a new feature, shouldNotify,
lets you make it highlight other ways.
- Fixed bugs with hasUpg, hasChall, hasMilestone, and inChallenge.
- Changed the sample code to use the above functions for convenience.

### v1.2.3 - 10/3/20

- Added a row component, which displays a list of objects in a row.
- Added a column component, which displays a list of objects in a column (useful within a row).
- Changed blanks to have a customizable width and height.

## v1.2: This Changes Everything! - 10/3/20

- Many layer features can now be static values or functions. (This made some formats change,
which will break old things)
- You can now use the "this" keyword, to make code easier to transfer when making new layers.
- Also added "this.layer", which is the current layer's name, and works on existing subfeatures
(e.g. individual upgrades) as well! Subfeatures also have "this.id".
- Fixed a big save issue. If you use a unique mod id, your save will never conflict with other mods.
- Added a configurable offline time limit in modinfo at the top of index.html. (default 1 hour)
- Added a few minor features, and updated the docs with new information.


### v1.1.1 - 9/30/20

- You can define hotkeys directly from layer config.

## v1.1: Enhanced Edition - 9/30/20

- Added "Buyables", which can function like Space Buildings or Enhancers.
- Custom CSS can now be used on any component! Make the third argument an object with CSS
parameters.
- Lots of minor good things.


## v1.0 - 9/27/20
- First release.
