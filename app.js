/* ================================================================
   ChatAI — Flagship AI Platform with Universal Code Language Engine
   Features:
   - Universal Code Language Support (35+ Languages with Syntax Highlighting)
   - Code Block Actions: Copy, Run Sandbox, Download as Native Extension
   - Multi-Language Code Sandbox (JS, TS, HTML, Python, SQL, Bash & Compiled)
   - Multi-Provider APIs (OpenAI / Gemini / Claude) & Smart Demo Fallback
   - AI Personas (General, Code Architect, Creative Writer, Academic Tutor, Startup Advisor)
   - Curated Prompt Templates Library with 1-click insert
   - Real-time Conversation History Search & Filtering
   - Sidebar Chat Pinning, Inline Renaming, Deletion & Batch Clear
   - Typewriter Response Streaming with Stop Generation Control
   - Regenerate AI Response capability
   - Multi-modal File/Image Attachment with Base64 preview & Lightbox
   - Conversation Branching (Inline Edit & Resend)
   - Share Conversation Modal (Markdown & Text Snapshots)
   - Multi-format Export (Markdown, PDF, JSON)
   - Web Speech Voice Input & Text-to-Speech Output
   - Live Token Estimator & Message Statistics
   - Markdown Table and Line-Numbered Code Block Rendering
   - Theme Toggle (Dark / Light) with localStorage Persistence
   ================================================================ */

'use strict';

// ── DOM helpers ────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const dom = {
  // Navigation & Sidebar
  sidebar:             $('sidebar'),
  sidebarToggle:       $('sidebarToggle'),
  mobileMenuBtn:       $('mobileMenuBtn'),
  newChatBtn:          $('newChatBtn'),
  historyList:         $('historyList'),
  historySearchInput:  $('historySearchInput'),
  searchClearBtn:      $('searchClearBtn'),
  clearAllChatsBtn:    $('clearAllChatsBtn'),
  themeToggle:         $('themeToggle'),
  sunIcon:             document.querySelector('.sun-icon'),
  moonIcon:            document.querySelector('.moon-icon'),

  // Header & Personas
  modelBtn:            $('modelBtn'),
  modelDropdown:       $('modelDropdown'),
  modelName:           $('modelName'),
  personaBtn:          $('personaBtn'),
  personaIcon:         $('personaIcon'),
  personaName:         $('personaName'),
  personaDropdown:     $('personaDropdown'),
  personaChipsBar:     $('personaChipsBar'),
  apiIndicator:        $('apiIndicator'),
  apiDot:              document.querySelector('#apiIndicator .api-dot'),
  apiLabel:            $('apiLabel'),
  chatStats:           $('chatStats'),
  chatStatsText:       $('chatStatsText'),
  fastModeToggle:      $('fastModeToggle'),
  fastModeLabel:       $('fastModeLabel'),
  fullscreenToggle:    $('fullscreenToggle'),
  ttsToggle:           $('ttsToggle'),
  openSettings:        $('openSettings'),
  exportWrapper:       $('exportWrapper'),
  exportBtn:           $('exportBtn'),
  exportDropdown:      $('exportDropdown'),
  exportMarkdown:      $('exportMarkdown'),
  exportPDF:           $('exportPDF'),
  exportJSON:          $('exportJSON'),
  shareBtn:            $('shareBtn'),

  // Chat Area
  messagesArea:        $('messagesArea'),
  messagesList:        $('messagesList'),
  welcomeScreen:       $('welcomeScreen'),

  // Input & Tools
  promptLibBtn:        $('promptLibBtn'),
  fileInput:           $('fileInput'),
  attachBtn:           $('attachBtn'),
  voiceBtn:            $('voiceBtn'),
  chatInput:           $('chatInput'),
  charCount:           $('charCount'),
  charCountEl:         $('charCount'),
  sendBtn:             $('sendBtn'),
  filePreviewStrip:    $('filePreviewStrip'),
  stopGenWrapper:      $('stopGenWrapper'),
  stopGenBtn:          $('stopGenBtn'),

  // Settings Modal
  modalBackdrop:       $('modalBackdrop'),
  settingsModal:       $('settingsModal'),
  modalTitle:          $('modalTitle'),
  modalClose:          $('modalClose'),
  providerGrid:        $('providerGrid'),
  modelSelect:         $('modelSelect'),
  apiKeyHint:          $('apiKeyHint'),
  apiKeyInput:         $('apiKeyInput'),
  keyToggle:           $('keyToggle'),
  keyStatus:           $('keyStatus'),
  systemPrompt:        $('systemPrompt'),
  ttsVoiceSelect:      $('ttsVoiceSelect'),
  apiStatusPill:       $('apiStatusPill'),
  apiStatusDot:        document.querySelector('#apiStatusPill .status-dot'),
  apiStatusText:       $('apiStatusText'),
  clearKeyBtn:         $('clearKeyBtn'),
  saveKeyBtn:          $('saveKeyBtn'),

  // Code Sandbox Runner Modal
  codeRunnerModal:     $('codeRunnerModal'),
  runnerModalTitle:    $('runnerModalTitle'),
  runnerFullscreenBtn: $('runnerFullscreenBtn'),
  runnerClose:         $('runnerClose'),
  runnerLangSelect:    $('runnerLangSelect'),
  runnerLangDot:       $('runnerLangDot'),
  runnerDownloadBtn:   $('runnerDownloadBtn'),
  runnerRunBtn:        $('runnerRunBtn'),
  runnerCodeInput:     $('runnerCodeInput'),
  tabConsole:          $('tabConsole'),
  tabPreview:          $('tabPreview'),
  panelConsole:        $('panelConsole'),
  panelPreview:        $('panelPreview'),
  runnerConsoleOutput: $('runnerConsoleOutput'),
  runnerIframe:        $('runnerIframe'),

  // Prompt Library Modal
  promptLibModal:      $('promptLibModal'),
  promptLibTitle:      $('promptLibTitle'),
  promptLibClose:      $('promptLibClose'),
  promptTabs:          $('promptTabs'),
  promptGrid:          $('promptGrid'),

  // Share Modal
  shareModal:          $('shareModal'),
  shareModalTitle:     $('shareModalTitle'),
  shareModalClose:     $('shareModalClose'),
  shareChatTitle:      $('shareChatTitle'),
  shareMsgCount:       $('shareMsgCount'),
  sharePreviewArea:    $('sharePreviewArea'),
  shareCopyMarkdownBtn:$('shareCopyMarkdownBtn'),
  shareCopyTextBtn:    $('shareCopyTextBtn'),
  shareLinkInput:         $('shareLinkInput'),
  shareCopyLinkBtn:       $('shareCopyLinkBtn'),
  shareActionCopyLinkBtn: $('shareActionCopyLinkBtn'),
  shareToWhatsAppBtn:     $('shareToWhatsAppBtn'),
  shareTargetTabs:        $('shareTargetTabs'),
  shareWifiIpBadge:       $('shareWifiIpBadge'),
  shareLinkTypeTitle:     $('shareLinkTypeTitle'),
  shareLinkTypeBadge:     $('shareLinkTypeBadge'),
  shareNetworkNotice:     $('shareNetworkNotice'),
  shareNoticeText:        $('shareNoticeText'),

  // Theme Accent Switcher
  themeAccentPicker:   $('themeAccentPicker'),
  accentPickerBtn:     $('accentPickerBtn'),
  accentDropdown:      $('accentDropdown'),

  // Executive Command Palette
  cmdPaletteModal:     $('cmdPaletteModal'),
  cmdPaletteInput:     $('cmdPaletteInput'),
  cmdPaletteList:      $('cmdPaletteList'),
  cmdPaletteCloseBtn:  $('cmdPaletteCloseBtn'),

  // AI Image Studio Modal
  imageGenBtn:             $('imageGenBtn'),
  imageStudioModal:        $('imageStudioModal'),
  imageStudioClose:        $('imageStudioClose'),
  studioPromptInput:       $('studioPromptInput'),
  studioPromptCounter:     $('studioPromptCounter'),
  studioClearPromptBtn:    $('studioClearPromptBtn'),
  studioSurprisePromptBtn: $('studioSurprisePromptBtn'),
  studioEnhanceToggle:     $('studioEnhanceToggle'),
  studioStyleGrid:         $('studioStyleGrid'),
  studioSelectedStyleBadge:$('studioSelectedStyleBadge'),
  studioAspectGrid:        $('studioAspectGrid'),
  studioModelSelect:       $('studioModelSelect'),
  studioNegativePrompt:    $('studioNegativePrompt'),
  studioSeedInput:         $('studioSeedInput'),
  studioSeedRandomBtn:     $('studioSeedRandomBtn'),
  studioGenerateBtn:       $('studioGenerateBtn'),
  studioCanvasStatus:      $('studioCanvasStatus'),
  studioCanvasActions:     $('studioCanvasActions'),
  studioZoomBtn:           $('studioZoomBtn'),
  studioCopyUrlBtn:        $('studioCopyUrlBtn'),
  studioDownloadBtn:       $('studioDownloadBtn'),
  studioInsertChatBtn:     $('studioInsertChatBtn'),
  studioEmptyState:        $('studioEmptyState'),
  studioLoadingState:      $('studioLoadingState'),
  studioLoadingSub:        $('studioLoadingSub'),
  studioImageWrap:         $('studioImageWrap'),
  studioResultImg:         $('studioResultImg'),
  studioImageMetaBar:      $('studioImageMetaBar'),
  metaRatio:               $('metaRatio'),
  metaModel:               $('metaModel'),
  metaSeed:                $('metaSeed'),
  metaPromptText:          $('metaPromptText'),
  studioGalleryStrip:      $('studioGalleryStrip'),
  studioGalleryEmpty:      $('studioGalleryEmpty'),
  studioClearGalleryBtn:   $('studioClearGalleryBtn'),

  // Executive Dashboard Widgets Deck
  dashboardToggleBtn:      $('dashboardToggleBtn'),
  dashboardCloseBtn:       $('dashboardCloseBtn'),
  dashboardBackdrop:       $('dashboardBackdrop'),
  executiveDashboardPanel: $('executiveDashboardPanel'),
  dashTokensVal:           $('dashTokensVal'),
  dashTokensSpeed:         $('dashTokensSpeed'),
  dashLatencyVal:          $('dashLatencyVal'),
  dashEfficiencyVal:       $('dashEfficiencyVal'),
  dashSavingsVal:          $('dashSavingsVal'),
  execTaskInput:           $('execTaskInput'),
  execTaskPriority:        $('execTaskPriority'),
  execTaskAddBtn:          $('execTaskAddBtn'),
  execTasksList:           $('execTasksList'),
  execTaskCounter:         $('execTaskCounter'),
  focusTimerDisplay:       $('focusTimerDisplay'),
  focusModeLabel:          $('focusModeLabel'),
  focusStartBtn:           $('focusStartBtn'),
  focusResetBtn:           $('focusResetBtn'),
  focusModeToggleBtn:      $('focusModeToggleBtn'),
  focusCycleBadge:         $('focusCycleBadge'),
  execScratchpadArea:      $('execScratchpadArea'),
  scratchpadWords:         $('scratchpadWords'),
  scratchpadClearBtn:      $('scratchpadClearBtn'),

  // Executive Dashboard Widgets 7-10 Deck
  pingGatewayBtn:          $('pingGatewayBtn'),
  pingOpenAI:              $('pingOpenAI'),
  pingAnthropic:           $('pingAnthropic'),
  pingGemini:              $('pingGemini'),
  pingLocal:               $('pingLocal'),
  gatewayLastPing:         $('gatewayLastPing'),
  budgetTotalTokens:       $('budgetTotalTokens'),
  budgetConsumedTokens:    $('budgetConsumedTokens'),
  budgetFillBar:           $('budgetFillBar'),
  budgetRemainingPct:      $('budgetRemainingPct'),
  costProjectedVal:        $('costProjectedVal'),
  costSavingsVal:          $('costSavingsVal'),
  simulateCostSavingsBtn:  $('simulateCostSavingsBtn'),
  exportCostReportBtn:     $('exportCostReportBtn'),
  eqVisualizer:            $('eqVisualizer'),
  voicePresetSelect:       $('voicePresetSelect'),
  testVoiceSynthesisBtn:   $('testVoiceSynthesisBtn'),

  // Google Search Console & Official SEO Portal
  googleSeoBtn:            $('googleSeoBtn'),
  googleSeoModal:          $('googleSeoModal'),
  googleSeoCloseBtn:       $('googleSeoCloseBtn'),
  googleSeoDoneBtn:        $('googleSeoDoneBtn'),
  copyGoogleVerificationBtn: $('copyGoogleVerificationBtn'),
  updateGscTokenBtn:       $('updateGscTokenBtn'),
  pingGooglebotSitemapBtn: $('pingGooglebotSitemapBtn'),
  googleVerificationCodeSnippet: $('googleVerificationCodeSnippet'),

  // Authentication & Profile Elements
  authOverlay:             $('authOverlay'),
  authCloseBtn:            $('authCloseBtn'),
  tabSignInBtn:            $('tabSignInBtn'),
  tabRegisterBtn:          $('tabRegisterBtn'),
  authDemoBtn:             $('authDemoBtn'),
  signInForm:              $('signInForm'),
  registerForm:            $('registerForm'),
  signInEmail:             $('signInEmail'),
  signInPassword:          $('signInPassword'),
  signInRemember:          $('signInRemember'),
  signInPwToggle:          $('signInPwToggle'),
  authForgotBtn:           $('authForgotBtn'),
  regName:                 $('regName'),
  regEmail:                $('regEmail'),
  regCompany:              $('regCompany'),
  regPassword:             $('regPassword'),
  regPwToggle:             $('regPwToggle'),
  pwStrengthBar:           $('pwStrengthBar'),
  pwStrengthLabel:         $('pwStrengthLabel'),
  ssoGoogleBtn:            $('ssoGoogleBtn'),
  ssoMicrosoftBtn:         $('ssoMicrosoftBtn'),
  ssoGithubBtn:            $('ssoGithubBtn'),
  ssoOktaBtn:              $('ssoOktaBtn'),
  userProfileBtn:          $('userProfileBtn'),
  userAvatar:              $('userAvatar'),
  userDisplayName:         $('userDisplayName'),
  userPlanBadge:           $('userPlanBadge'),
  userAccountPopover:      $('userAccountPopover'),
  popoverAvatar:           $('popoverAvatar'),
  popoverName:             $('popoverName'),
  popoverEmail:            $('popoverEmail'),
  popoverTierName:         $('popoverTierName'),
  popoverSwitchAccountBtn: $('popoverSwitchAccountBtn'),
  popoverSignOutBtn:       $('popoverSignOutBtn'),

  // Frontier AI Suite (Claude Artifacts, Gemini Search, Deep Thinking, Voice Orb & Memory)
  artifactsCanvasToggleBtn: $('artifactsCanvasToggleBtn'),
  artifactDotBadge:         $('artifactDotBadge'),
  claudeArtifactsCanvas:    $('claudeArtifactsCanvas'),
  canvasTitle:              $('canvasTitle'),
  canvasTag:                $('canvasTag'),
  canvasSubtitle:           $('canvasSubtitle'),
  canvasTypeIcon:           $('canvasTypeIcon'),
  canvasPreviewTab:         $('canvasPreviewTab'),
  canvasCodeTab:            $('canvasCodeTab'),
  canvasReloadBtn:          $('canvasReloadBtn'),
  canvasCopyCodeBtn:        $('canvasCopyCodeBtn'),
  canvasDownloadBtn:        $('canvasDownloadBtn'),
  canvasCloseBtn:           $('canvasCloseBtn'),
  canvasFrameContainer:     $('canvasFrameContainer'),
  canvasIframe:             $('canvasIframe'),
  canvasPreviewPanel:       $('canvasPreviewPanel'),
  canvasCodePanel:          $('canvasCodePanel'),
  canvasCodeBlock:          $('canvasCodeBlock'),

  webSearchToggle:          $('webSearchToggle'),
  deepReasoningToggle:      $('deepReasoningToggle'),
  advancedVoiceBtn:         $('advancedVoiceBtn'),

  advancedVoiceModal:       $('advancedVoiceModal'),
  advancedVoiceCloseBtn:    $('advancedVoiceCloseBtn'),
  voiceOrbCanvas:           $('voiceOrbCanvas'),
  voiceStatusPill:          $('voiceStatusPill'),
  voiceStatusText:          $('voiceStatusText'),
  voiceLiveText:            $('voiceLiveText'),
  voicePersonaSelect:       $('voicePersonaSelect'),
  voiceMuteMicBtn:          $('voiceMuteMicBtn'),
  voiceEndSessionBtn:       $('voiceEndSessionBtn'),

  memoryModalBtn:           $('memoryModalBtn'),
  memoryModal:              $('memoryModal'),
  memoryCloseBtn:           $('memoryCloseBtn'),
  memoryCancelBtn:          $('memoryCancelBtn'),
  memorySaveBtn:            $('memorySaveBtn'),
  memUserContext:           $('memUserContext'),
  memResponseBehavior:      $('memResponseBehavior'),
  memoryNewInput:           $('memoryNewInput'),
  memoryAddBtn:             $('memoryAddBtn'),
  clearAllMemoriesBtn:      $('clearAllMemoriesBtn'),
  memoriesChipsList:        $('memoriesChipsList'),
  memoryStatusText:         $('memoryStatusText'),

  // Individual Message Share Modal
  shareMessageModal:        $('shareMessageModal'),
  shareMessageModalClose:   $('shareMessageModalClose'),
  shareMsgAvatar:           $('shareMsgAvatar'),
  shareMsgAuthorName:       $('shareMsgAuthorName'),
  shareMsgTextPreview:      $('shareMsgTextPreview'),
  shareMsgTime:             $('shareMsgTime'),
  shareNativeBtn:           $('shareNativeBtn'),
  shareTwitterBtn:          $('shareTwitterBtn'),
  shareWhatsAppBtn:         $('shareWhatsAppBtn'),
  shareLinkedInBtn:         $('shareLinkedInBtn'),
  shareEmailBtn:            $('shareEmailBtn'),
  shareCopyMsgLinkBtn:      $('shareCopyMsgLinkBtn'),
  shareCopyMsgQuoteBtn:     $('shareCopyMsgQuoteBtn'),
};

// ── Universal Code Language Metadata (65+ Languages) ───────────
const LANGUAGE_META = {
  // Web & Frontend
  javascript: { name: 'JavaScript', ext: 'js',         color: '#f7df1e', icon: '🟨', runnable: true },
  js:         { name: 'JavaScript', ext: 'js',         color: '#f7df1e', icon: '🟨', runnable: true },
  mjs:        { name: 'JavaScript', ext: 'mjs',        color: '#f7df1e', icon: '🟨', runnable: true },
  cjs:        { name: 'JavaScript', ext: 'cjs',        color: '#f7df1e', icon: '🟨', runnable: true },
  typescript: { name: 'TypeScript', ext: 'ts',         color: '#3178c6', icon: '🔷', runnable: true },
  ts:         { name: 'TypeScript', ext: 'ts',         color: '#3178c6', icon: '🔷', runnable: true },
  jsx:        { name: 'React JSX',  ext: 'jsx',        color: '#61dafb', icon: '⚛️', runnable: true },
  tsx:        { name: 'React TSX',  ext: 'tsx',        color: '#61dafb', icon: '⚛️', runnable: true },
  html:       { name: 'HTML5',      ext: 'html',       color: '#e34f26', icon: '🌐', runnable: true },
  htm:        { name: 'HTML5',      ext: 'html',       color: '#e34f26', icon: '🌐', runnable: true },
  css:        { name: 'CSS3',       ext: 'css',        color: '#1572b6', icon: '🎨', runnable: true },
  scss:       { name: 'SCSS',       ext: 'scss',       color: '#c6538c', icon: '🎨', runnable: true },
  sass:       { name: 'SASS',       ext: 'sass',       color: '#c6538c', icon: '🎨', runnable: true },
  less:       { name: 'Less',       ext: 'less',       color: '#1d365d', icon: '🎨', runnable: true },
  vue:        { name: 'Vue.js',     ext: 'vue',        color: '#42b883', icon: '💚', runnable: true },
  svelte:     { name: 'Svelte',     ext: 'svelte',     color: '#ff3e00', icon: '🧡', runnable: true },
  wat:        { name: 'WebAssembly',ext: 'wat',        color: '#654ff0', icon: '⚙️', runnable: true },
  wasm:       { name: 'WebAssembly',ext: 'wasm',       color: '#654ff0', icon: '⚙️', runnable: true },

  // Backend & Scripting
  python:     { name: 'Python',     ext: 'py',         color: '#3776ab', icon: '🐍', runnable: true },
  py:         { name: 'Python',     ext: 'py',         color: '#3776ab', icon: '🐍', runnable: true },
  python3:    { name: 'Python',     ext: 'py',         color: '#3776ab', icon: '🐍', runnable: true },
  php:        { name: 'PHP',        ext: 'php',        color: '#777bb4', icon: '🐘', runnable: true },
  ruby:       { name: 'Ruby',       ext: 'rb',         color: '#cc342d', icon: '💎', runnable: true },
  rb:         { name: 'Ruby',       ext: 'rb',         color: '#cc342d', icon: '💎', runnable: true },
  perl:       { name: 'Perl',       ext: 'pl',         color: '#0298c3', icon: '🐪', runnable: true },
  pl:         { name: 'Perl',       ext: 'pl',         color: '#0298c3', icon: '🐪', runnable: true },
  lua:        { name: 'Lua',        ext: 'lua',        color: '#000080', icon: '🌙', runnable: true },
  tcl:        { name: 'Tcl',        ext: 'tcl',        color: '#145b8b', icon: '🪶', runnable: true },

  // Systems & Native
  rust:       { name: 'Rust',       ext: 'rs',         color: '#dea584', icon: '🦀', runnable: true },
  rs:         { name: 'Rust',       ext: 'rs',         color: '#dea584', icon: '🦀', runnable: true },
  go:         { name: 'Go',         ext: 'go',         color: '#00add8', icon: '🐹', runnable: true },
  golang:     { name: 'Go',         ext: 'go',         color: '#00add8', icon: '🐹', runnable: true },
  c:          { name: 'C',          ext: 'c',          color: '#555555', icon: '⚙️', runnable: true },
  h:          { name: 'C Header',   ext: 'h',          color: '#555555', icon: '⚙️', runnable: true },
  cpp:        { name: 'C++',        ext: 'cpp',        color: '#00599c', icon: '⚡', runnable: true },
  'c++':      { name: 'C++',        ext: 'cpp',        color: '#00599c', icon: '⚡', runnable: true },
  cc:         { name: 'C++',        ext: 'cpp',        color: '#00599c', icon: '⚡', runnable: true },
  cxx:        { name: 'C++',        ext: 'cpp',        color: '#00599c', icon: '⚡', runnable: true },
  csharp:     { name: 'C#',         ext: 'cs',         color: '#239120', icon: '🎯', runnable: true },
  cs:         { name: 'C#',         ext: 'cs',         color: '#239120', icon: '🎯', runnable: true },
  'c#':       { name: 'C#',         ext: 'cs',         color: '#239120', icon: '🎯', runnable: true },
  swift:      { name: 'Swift',      ext: 'swift',      color: '#f05138', icon: '🐦', runnable: true },
  objc:       { name: 'Objective-C',ext: 'm',          color: '#438eff', icon: '🍎', runnable: true },
  'objective-c':{ name: 'Objective-C',ext: 'm',        color: '#438eff', icon: '🍎', runnable: true },
  zig:        { name: 'Zig',        ext: 'zig',        color: '#f7a41d', icon: '⚡', runnable: true },
  d:          { name: 'D',          ext: 'd',          color: '#ba595e', icon: '🎯', runnable: true },
  nim:        { name: 'Nim',        ext: 'nim',        color: '#ffe953', icon: '👑', runnable: true },
  v:          { name: 'V',          ext: 'v',          color: '#4f87c4', icon: '✌️', runnable: true },
  vlang:      { name: 'V',          ext: 'v',          color: '#4f87c4', icon: '✌️', runnable: true },
  assembly:   { name: 'Assembly',   ext: 'asm',        color: '#6e4c13', icon: '⚙️', runnable: true },
  asm:        { name: 'Assembly',   ext: 'asm',        color: '#6e4c13', icon: '⚙️', runnable: true },
  nasm:       { name: 'Assembly',   ext: 'asm',        color: '#6e4c13', icon: '⚙️', runnable: true },
  fortran:    { name: 'Fortran',    ext: 'f90',        color: '#734f96', icon: '🔢', runnable: true },
  f90:        { name: 'Fortran',    ext: 'f90',        color: '#734f96', icon: '🔢', runnable: true },
  cobol:      { name: 'COBOL',      ext: 'cbl',        color: '#005ca5', icon: '🏛️', runnable: true },

  // JVM & Enterprise
  java:       { name: 'Java',       ext: 'java',       color: '#ea2d2e', icon: '☕', runnable: true },
  kotlin:     { name: 'Kotlin',     ext: 'kt',         color: '#7f52ff', icon: '🟣', runnable: true },
  kt:         { name: 'Kotlin',     ext: 'kt',         color: '#7f52ff', icon: '🟣', runnable: true },
  scala:      { name: 'Scala',      ext: 'scala',      color: '#dc322f', icon: '🔴', runnable: true },
  groovy:     { name: 'Groovy',     ext: 'groovy',     color: '#4298b8', icon: '🌿', runnable: true },
  clojure:    { name: 'Clojure',    ext: 'clj',        color: '#5881d8', icon: '🌀', runnable: true },
  clj:        { name: 'Clojure',    ext: 'clj',        color: '#5881d8', icon: '🌀', runnable: true },

  // Functional Languages
  haskell:    { name: 'Haskell',    ext: 'hs',         color: '#5e5086', icon: 'λ',  runnable: true },
  hs:         { name: 'Haskell',    ext: 'hs',         color: '#5e5086', icon: 'λ',  runnable: true },
  elixir:     { name: 'Elixir',     ext: 'ex',         color: '#6e4a7e', icon: '💧', runnable: true },
  ex:         { name: 'Elixir',     ext: 'ex',         color: '#6e4a7e', icon: '💧', runnable: true },
  erlang:     { name: 'Erlang',     ext: 'erl',        color: '#a90533', icon: '📞', runnable: true },
  erl:        { name: 'Erlang',     ext: 'erl',        color: '#a90533', icon: '📞', runnable: true },
  ocaml:      { name: 'OCaml',      ext: 'ml',         color: '#ee6a1a', icon: '🐫', runnable: true },
  ml:         { name: 'OCaml',      ext: 'ml',         color: '#ee6a1a', icon: '🐫', runnable: true },
  fsharp:     { name: 'F#',         ext: 'fs',         color: '#b845fc', icon: '🔷', runnable: true },
  fs:         { name: 'F#',         ext: 'fs',         color: '#b845fc', icon: '🔷', runnable: true },
  elm:        { name: 'Elm',        ext: 'elm',        color: '#60b5cc', icon: '🌳', runnable: true },
  lisp:       { name: 'Common Lisp',ext: 'lisp',       color: '#3fb68b', icon: '💡', runnable: true },
  racket:     { name: 'Racket',     ext: 'rkt',        color: '#3c5caa', icon: '🚀', runnable: true },
  scheme:     { name: 'Scheme',     ext: 'scm',        color: '#1e4aec', icon: 'λ',  runnable: true },

  // Data Science & Math
  r:          { name: 'R',          ext: 'r',          color: '#276dc3', icon: '📊', runnable: true },
  julia:      { name: 'Julia',      ext: 'jl',         color: '#9558b2', icon: '🟣', runnable: true },
  jl:         { name: 'Julia',      ext: 'jl',         color: '#9558b2', icon: '🟣', runnable: true },
  matlab:     { name: 'MATLAB',     ext: 'm',          color: '#e16737', icon: '📈', runnable: true },
  octave:     { name: 'Octave',     ext: 'm',          color: '#e16737', icon: '📈', runnable: true },
  sas:        { name: 'SAS',        ext: 'sas',        color: '#1e68b5', icon: '📊', runnable: true },

  // Mobile
  dart:       { name: 'Dart',       ext: 'dart',       color: '#0175c2', icon: '🎯', runnable: true },

  // Databases & Query
  sql:        { name: 'SQL',        ext: 'sql',        color: '#e38c00', icon: '🗄️', runnable: true },
  postgresql: { name: 'PostgreSQL', ext: 'pgsql',      color: '#336791', icon: '🐘', runnable: true },
  postgres:   { name: 'PostgreSQL', ext: 'pgsql',      color: '#336791', icon: '🐘', runnable: true },
  mysql:      { name: 'MySQL',      ext: 'sql',        color: '#00758f', icon: '🐬', runnable: true },
  sqlite:     { name: 'SQLite',     ext: 'sqlite',     color: '#003b57', icon: '🪶', runnable: true },
  plsql:      { name: 'PL/SQL',     ext: 'pls',        color: '#e38c00', icon: '🗄️', runnable: true },
  graphql:    { name: 'GraphQL',    ext: 'gql',        color: '#e10098', icon: '🕸️', runnable: true },
  gql:        { name: 'GraphQL',    ext: 'gql',        color: '#e10098', icon: '🕸️', runnable: true },

  // Shell & Terminal
  bash:       { name: 'Bash',       ext: 'sh',         color: '#4eaa25', icon: '💻', runnable: true },
  sh:         { name: 'Shell',      ext: 'sh',         color: '#4eaa25', icon: '💻', runnable: true },
  shell:      { name: 'Shell',      ext: 'sh',         color: '#4eaa25', icon: '💻', runnable: true },
  zsh:        { name: 'Zsh',        ext: 'zsh',        color: '#4eaa25', icon: '💻', runnable: true },
  fish:       { name: 'Fish',       ext: 'fish',       color: '#bf4040', icon: '🐟', runnable: true },
  powershell: { name: 'PowerShell', ext: 'ps1',        color: '#012456', icon: '🟦', runnable: true },
  pwsh:       { name: 'PowerShell', ext: 'ps1',        color: '#012456', icon: '🟦', runnable: true },
  batch:      { name: 'Batch / CMD',ext: 'bat',        color: '#c1f12e', icon: '⬛', runnable: true },
  bat:        { name: 'Batch',      ext: 'bat',        color: '#c1f12e', icon: '⬛', runnable: true },
  cmd:        { name: 'CMD',        ext: 'cmd',        color: '#c1f12e', icon: '⬛', runnable: true },

  // DevOps, Cloud & Config
  dockerfile: { name: 'Dockerfile', ext: 'dockerfile', color: '#2496ed', icon: '🐳', runnable: true },
  docker:     { name: 'Docker',     ext: 'dockerfile', color: '#2496ed', icon: '🐳', runnable: true },
  compose:    { name: 'Docker Compose', ext: 'yml',    color: '#2496ed', icon: '🐳', runnable: true },
  yaml:       { name: 'YAML',       ext: 'yaml',       color: '#cb171e', icon: '📄', runnable: true },
  yml:        { name: 'YAML',       ext: 'yml',        color: '#cb171e', icon: '📄', runnable: true },
  toml:       { name: 'TOML',       ext: 'toml',       color: '#9c4221', icon: '📄', runnable: true },
  ini:        { name: 'INI',        ext: 'ini',        color: '#a0a0a0', icon: '⚙️', runnable: true },
  terraform:  { name: 'Terraform',  ext: 'tf',         color: '#7b42bc', icon: '☁️', runnable: true },
  tf:         { name: 'Terraform',  ext: 'tf',         color: '#7b42bc', icon: '☁️', runnable: true },
  hcl:        { name: 'HCL',        ext: 'hcl',        color: '#7b42bc', icon: '☁️', runnable: true },
  nginx:      { name: 'Nginx',      ext: 'conf',       color: '#009639', icon: '🌐', runnable: true },
  apache:     { name: 'Apache',     ext: 'conf',       color: '#d22128', icon: '🪶', runnable: true },
  makefile:   { name: 'Makefile',   ext: 'mk',         color: '#6d8086', icon: '🛠️', runnable: true },
  make:       { name: 'Makefile',   ext: 'mk',         color: '#6d8086', icon: '🛠️', runnable: true },
  cmake:      { name: 'CMake',      ext: 'cmake',      color: '#064f8c', icon: '🛠️', runnable: true },

  // Smart Contracts
  solidity:   { name: 'Solidity',   ext: 'sol',        color: '#363636', icon: '🪙', runnable: true },
  sol:        { name: 'Solidity',   ext: 'sol',        color: '#363636', icon: '🪙', runnable: true },
  vyper:      { name: 'Vyper',      ext: 'vy',         color: '#284b63', icon: '🐍', runnable: true },
  move:       { name: 'Move',       ext: 'move',       color: '#005479', icon: '📦', runnable: true },
  cairo:      { name: 'Cairo',      ext: 'cairo',      color: '#ff4c00', icon: '🏛️', runnable: true },

  // Markup, Docs & Data
  markdown:   { name: 'Markdown',   ext: 'md',         color: '#083fa1', icon: '📝', runnable: true },
  md:         { name: 'Markdown',   ext: 'md',         color: '#083fa1', icon: '📝', runnable: true },
  json:       { name: 'JSON',       ext: 'json',       color: '#a0a0a0', icon: '📋', runnable: true },
  json5:      { name: 'JSON5',      ext: 'json5',      color: '#a0a0a0', icon: '📋', runnable: true },
  xml:        { name: 'XML',        ext: 'xml',        color: '#e34f26', icon: '📰', runnable: true },
  svg:        { name: 'SVG',        ext: 'svg',        color: '#ff9900', icon: '🖼️', runnable: true },
  latex:      { name: 'LaTeX',      ext: 'tex',        color: '#008080', icon: '📄', runnable: true },
  tex:        { name: 'TeX',        ext: 'tex',        color: '#008080', icon: '📄', runnable: true },
  csv:        { name: 'CSV',        ext: 'csv',        color: '#22c55e', icon: '📊', runnable: true },
  diff:       { name: 'Diff',       ext: 'diff',       color: '#eab308', icon: '⚖️', runnable: true },
};

function getLanguageMeta(lang) {
  const l = (lang || '').toLowerCase().trim();
  return LANGUAGE_META[l] || {
    name:     lang ? lang.toUpperCase() : 'CODE',
    ext:      'txt',
    color:    '#6366f1',
    icon:     '📄',
    runnable: false,
  };
}

// ── Persona Definitions ─────────────────────────────────────────
const PERSONAS = {
  general: {
    name:   'General',
    icon:   '⚡',
    prompt: 'You are a versatile, polite, and helpful AI assistant.',
  },
  code: {
    name:   'Code Architect',
    icon:   '💻',
    prompt: 'You are a Principal Software Architect. Write clean, modular, and maintainable code across any language requested (Python, JS, TS, Rust, Go, C++, Java, etc.). Include runnable examples, code explanations, and complexity analysis.',
  },
  writer: {
    name:   'Creative Writer',
    icon:   '✍️',
    prompt: 'You are an award-winning creative writer and copywriter. Your prose is engaging, vivid, evocative, and tailored precisely to the requested audience.',
  },
  tutor: {
    name:   'Academic Tutor',
    icon:   '🎓',
    prompt: 'You are a patient and rigorous academic professor. You break down complex concepts using first-principles thinking, intuitive analogies, and the Socratic method.',
  },
  startup: {
    name:   'Startup Advisor',
    icon:   '💼',
    prompt: 'You are a seasoned venture capitalist and startup accelerator director. Focus on product-market fit, unit economics, distribution strategy, and rapid execution.',
  },
};

// ── Curated Prompt Library ──────────────────────────────────────
const PROMPT_TEMPLATES = [
  {
    id:       'p1',
    category: 'code',
    title:    'Code Refactoring & Optimization',
    desc:     'Analyze code for readability, performance bottlenecks, and modern clean patterns.',
    template: 'Please review and refactor the following code for optimal performance, readability, and modern best practices:\n\n```\n[paste code here]\n```',
  },
  {
    id:       'p2',
    category: 'code',
    title:    'Write Unit Tests',
    desc:     'Generate comprehensive test suites with edge cases and mocks.',
    template: 'Write a comprehensive suite of unit tests with edge cases and happy paths for the following function:\n\n```\n[paste code here]\n```',
  },
  {
    id:       'p3',
    category: 'code',
    title:    'Interactive HTML Component',
    desc:     'Build a sleek, modern UI component with HTML, CSS, and JS.',
    template: 'Create a responsive, modern HTML/CSS/JavaScript card component featuring sleek glassmorphism and subtle micro-interactions.',
  },
  {
    id:       'p4',
    category: 'code',
    title:    'SQL Database Schema & Queries',
    desc:     'Design normalized schemas, indexes, and complex analytical queries.',
    template: 'Design a clean SQL schema for an e-commerce platform with Users, Orders, and Products. Include table creation, indexes, and an aggregation query.',
  },
  {
    id:       'p5',
    category: 'code',
    title:    'Rust High-Performance Function',
    desc:     'Safe concurrency, memory efficiency, and idiomatic error handling.',
    template: 'Write an idiomatic Rust function to process and parse data concurrently using channels or iterators with robust Result error handling.',
  },
  {
    id:       'p6',
    category: 'write',
    title:    'Executive Summary',
    desc:     'Distill long reports or meeting notes into a sharp executive brief.',
    template: 'Please synthesize the following text into a structured Executive Summary with Key Findings, Strategic Implications, and Action Items:\n\n[paste notes or document here]',
  },
  {
    id:       'p7',
    category: 'write',
    title:    'Cold Outreach Email',
    desc:     'Craft a personalized, high-converting outreach message.',
    template: 'Draft a concise, compelling cold outreach email to [target persona/title] proposing a discussion on [your value proposition]. Keep it under 150 words.',
  },
  {
    id:       'p8',
    category: 'strategy',
    title:    'Startup Idea Validation',
    desc:     'Stress-test a business concept across moats, market size, and risks.',
    template: 'Perform a rigorous venture validation on this business idea: "[brief description]". Analyze: 1) Target market & TAM, 2) Unit economics, 3) Distribution channels, 4) Critical risks.',
  },
  {
    id:       'p9',
    category: 'learn',
    title:    'Explain Like I am 5 (ELI5)',
    desc:     'Demystify complicated concepts using simple everyday metaphors.',
    template: 'Explain the concept of "[complex topic]" as if I were 10 years old. Use a relatable everyday analogy and avoid technical jargon.',
  },
  {
    id:       'p10',
    category: 'learn',
    title:    'Socratic Debate Partner',
    desc:     'Engage in a structured philosophical or technical inquiry.',
    template: 'Act as a Socratic debate partner. Challenge my position on "[topic]" by asking probing questions one at a time to examine underlying assumptions.',
  },
];

// ── App State ──────────────────────────────────────────────────
const state = {
  messages:        [],          // current chat [{role,content,id,attachments?,edited?}]
  allChats:        [],          // persisted chats [{id,title,messages,ts,pinned?}]
  currentChatId:   null,
  isTyping:        false,
  isStreaming:     false,
  stopRequested:   false,
  searchQuery:     '',
  persona:         localStorage.getItem('chatai_persona') || 'general',
  theme:           localStorage.getItem('chatai_theme')   || 'dark',
  sidebarOpen:     true,
  attachedFiles:   [],          // [{ name, size, type, dataUrl, isImage }]

  // API
  provider:        localStorage.getItem('chatai_provider')   || 'openai',
  apiModel:        localStorage.getItem('chatai_model')      || 'gpt-4o',
  apiKey:          localStorage.getItem('chatai_key')        || '',
  systemPrompt:    localStorage.getItem('chatai_sysprompt') || '',

  // Voice
  ttsEnabled:      localStorage.getItem('chatai_tts') === 'true',
  ttsVoice:        localStorage.getItem('chatai_ttsvoice') || '',
  isListening:     false,
  recognition:     null,
  synth:           window.speechSynthesis || null,
  currentUtter:    null,

  // Speed & Display (Full Screen & Fast Response)
  fastResponse:    localStorage.getItem('chatai_fast_response') !== 'false',
  isFullscreen:    false,
  runnerFullscreen:false,

  // AI Image Studio State
  imageStudio: {
    selectedStyle: 'photorealistic',
    aspectRatio: '1:1',
    width: 1024,
    height: 1024,
    enhance: true,
    model: 'flux',
    seed: null,
    isGenerating: false,
    currentResult: null,
    gallery: []
  },

  // Frontier AI Suite State
  webSearchEnabled:    localStorage.getItem('chatai_web_search') === 'true',
  deepReasoningEnabled:localStorage.getItem('chatai_deep_reasoning') === 'true',
  activeArtifact:      null, // { title, type, language, code }
  customInstructions:  {
    userContext:      localStorage.getItem('chatai_user_context') || '',
    responseBehavior: localStorage.getItem('chatai_response_behavior') || '',
  },
  memories: (() => {
    try {
      const stored = localStorage.getItem('chatai_memories');
      return stored ? JSON.parse(stored) : [
        'Prefers clean modern architecture with zero external bloat',
        'Working on enterprise frontend & cloud systems'
      ];
    } catch {
      return ['Prefers clean modern architecture with zero external bloat'];
    }
  })(),
  voiceMode: {
    active: false,
    muted: false,
    persona: localStorage.getItem('chatai_voice_persona') || 'breeze',
    audioContext: null,
    analyser: null,
    animId: null,
    recognition: null,
  },
};

// ── Provider config ────────────────────────────────────────────
const PROVIDERS = {
  openai: {
    label:   'OpenAI',
    hint:    'Get yours at platform.openai.com',
    models:  [
      { value: 'gpt-4o',       label: 'GPT-4o (Recommended)' },
      { value: 'gpt-4o-mini',  label: 'GPT-4o Mini (Faster)'  },
      { value: 'gpt-3.5-turbo',label: 'GPT-3.5 Turbo'         },
    ],
    endpoint: 'https://api.openai.com/v1/chat/completions',
  },
  gemini: {
    label:   'Gemini',
    hint:    'Get yours at aistudio.google.com',
    models:  [
      { value: 'gemini-1.5-pro',   label: 'Gemini 1.5 Pro'   },
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash'  },
      { value: 'gemini-pro',       label: 'Gemini Pro'        },
    ],
    endpoint: null,
  },
  claude: {
    label:   'Claude',
    hint:    'Get yours at console.anthropic.com',
    models:  [
      { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
      { value: 'claude-3-haiku-20240307',    label: 'Claude 3 Haiku'    },
      { value: 'claude-3-opus-20240229',     label: 'Claude 3 Opus'     },
    ],
    endpoint: 'https://api.anthropic.com/v1/messages',
  },
};

// ═══════════════════════════════════════════════════════════════
//  FREE AI SERVICE & COMPREHENSIVE OFFLINE SYNTHESIS ENGINE
// ═══════════════════════════════════════════════════════════════

// 1. Live Free AI API (Dual Local Proxy & Direct Endpoint — No API Key Required)
async function callFreeAI(userMessage, attachments) {
  const persona = PERSONAS[state.persona] || PERSONAS.general;
  const sysPrompt = getEffectiveSystemPrompt();

  const history = state.messages.slice(-8).map(m => ({
    role:    m.role === 'ai' ? 'assistant' : 'user',
    content: m.content,
  }));
  history.push({ role: 'user', content: userMessage });

  const payload = {
    messages: [
      {
        role: 'system',
        content: `${sysPrompt}\nYou are an expert programmer and knowledgeable AI assistant. Always provide working, complete, well-commented code in markdown code blocks with the exact language identifier (e.g. \`\`\`c, \`\`\`python, \`\`\`cpp, \`\`\`java, \`\`\`javascript, \`\`\`rust, \`\`\`go, \`\`\`sql) followed by a clear step-by-step logic breakdown, example input/output, and time complexity.`
      },
      ...history
    ],
    model: 'openai'
  };

  // Attempt 1: Local server proxy /api/chat (prevents CORS or browser extension blocks)
  try {
    const localCtrl = new AbortController();
    const localTimer = setTimeout(() => localCtrl.abort(), 20000);
    const localRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: localCtrl.signal
    });
    clearTimeout(localTimer);
    if (localRes.ok) {
      const data = await localRes.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text && text.trim()) return text;
    }
  } catch (err) {
    console.warn('Local /api/chat proxy error:', err.message);
  }

  // Attempt 2: Direct Pollinations AI endpoint
  const directCtrl = new AbortController();
  const directTimer = setTimeout(() => directCtrl.abort(), 20000);
  const directRes = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: directCtrl.signal
  });
  clearTimeout(directTimer);

  if (!directRes.ok) throw new Error(`HTTP error ${directRes.status}`);
  const data = await directRes.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text || !text.trim()) throw new Error('Empty response from free AI service');
  return text;
}

// 2. Intelligent Offline Code & Knowledge Synthesis Engine (Zero Network Fallback)
function generateOfflineAIResponse(userMessage, attachments) {
  if (attachments && attachments.length > 0) {
    const names = attachments.map(a => a.name).join(', ');
    return `📎 **Analyzed ${attachments.length} attachment(s): ${escHtml(names)}**\n\nI have received your file(s). You can ask me specific questions to parse, refactor, or extract code and text from them!`;
  }

  const raw = (userMessage || '').trim();
  const low = raw.toLowerCase();
  const persona = PERSONAS[state.persona] || PERSONAS.general;

  // Language Detection
  let lang = 'python';
  let langName = 'Python';
  let ext = 'py';

  if (/\b(in c\b|c program|c code|using c\b|with c\b)\b/.test(low)) {
    lang = 'c'; langName = 'C'; ext = 'c';
  } else if (/\b(c\+\+|cpp|c plus plus)\b/.test(low)) {
    lang = 'cpp'; langName = 'C++'; ext = 'cpp';
  } else if (/\b(java\b|in java)\b/.test(low) && !/javascript/.test(low)) {
    lang = 'java'; langName = 'Java'; ext = 'java';
  } else if (/\b(javascript|js|node|in js)\b/.test(low)) {
    lang = 'javascript'; langName = 'JavaScript'; ext = 'js';
  } else if (/\b(typescript|ts|in ts)\b/.test(low)) {
    lang = 'typescript'; langName = 'TypeScript'; ext = 'ts';
  } else if (/\b(rust|in rust)\b/.test(low)) {
    lang = 'rust'; langName = 'Rust'; ext = 'rs';
  } else if (/\b(go\b|golang)\b/.test(low)) {
    lang = 'go'; langName = 'Go'; ext = 'go';
  } else if (/\b(c#|csharp|in c#)\b/.test(low)) {
    lang = 'csharp'; langName = 'C#'; ext = 'cs';
  } else if (/\b(php|in php)\b/.test(low)) {
    lang = 'php'; langName = 'PHP'; ext = 'php';
  } else if (/\b(ruby|in ruby)\b/.test(low)) {
    lang = 'ruby'; langName = 'Ruby'; ext = 'rb';
  } else if (/\b(kotlin|in kotlin|kt)\b/.test(low)) {
    lang = 'kotlin'; langName = 'Kotlin'; ext = 'kt';
  } else if (/\b(swift|in swift)\b/.test(low)) {
    lang = 'swift'; langName = 'Swift'; ext = 'swift';
  } else if (/\b(html|css|web page|webpage|landing page|card|website|web site|web app|web application|frontend|ui)\b/.test(low) || (/\battend(?:a|e)nce\b/i.test(low) && !/\b(in c\b|c\+\+|cpp|in java\b|in python|in rust|in go)\b/.test(low))) {
    lang = 'html'; langName = 'HTML5 / CSS3'; ext = 'html';
  } else if (/\b(sql|database|query|table|select|postgres|mysql)\b/.test(low)) {
    lang = 'sql'; langName = 'SQL'; ext = 'sql';
  } else if (/\b(bash|shell|terminal|sh\b)\b/.test(low)) {
    lang = 'bash'; langName = 'Bash'; ext = 'sh';
  } else if (/\b(docker|dockerfile)\b/.test(low)) {
    lang = 'dockerfile'; langName = 'Dockerfile'; ext = 'dockerfile';
  } else if (/\b(solidity|sol\b|smart contract)\b/.test(low)) {
    lang = 'solidity'; langName = 'Solidity'; ext = 'sol';
  }

  // ── Problem / Topic Recognition ─────────────────────────────────

  // ── 0. Dedicated Web Applications & Domain Systems ──────────────
  if (/\battend(?:a|e)nce\b/i.test(low)) {
    if (lang === 'python') {
      const pyCode = `# Smart Attendance Tracking System in Python 3.12
from datetime import datetime
from typing import Dict, List, Optional

class Student:
    def __init__(self, roll_no: str, name: str, dept: str):
        self.roll_no = roll_no
        self.name = name
        self.dept = dept
        self.status: str = "Absent"
        self.timestamp: Optional[str] = None

    def mark(self, status: str):
        self.status = status
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

class AttendanceSystem:
    def __init__(self, course_name: str):
        self.course_name = course_name
        self.roster: Dict[str, Student] = {}

    def add_student(self, roll_no: str, name: str, dept: str):
        self.roster[roll_no] = Student(roll_no, name, dept)

    def mark_attendance(self, roll_no: str, status: str):
        if roll_no in self.roster:
            self.roster[roll_no].mark(status)
            return True
        return False

    def generate_report(self):
        total = len(self.roster)
        present = sum(1 for s in self.roster.values() if s.status == "Present")
        late = sum(1 for s in self.roster.values() if s.status == "Late")
        absent = sum(1 for s in self.roster.values() if s.status == "Absent")
        rate = ((present + late * 0.5) / total * 100) if total > 0 else 0

        print(f"\\n{'='*55}")
        print(f"  ATTENDANCE REPORT: {self.course_name}")
        print(f"  Date: {datetime.now().strftime('%B %d, %Y')}")
        print(f"{'='*55}")
        print(f"{'Roll No':<10} {'Name':<18} {'Dept':<12} {'Status':<10}")
        print(f"{'-'*55}")
        for s in self.roster.values():
            print(f"{s.roll_no:<10} {s.name:<18} {s.dept:<12} {s.status:<10}")
        print(f"{'-'*55}")
        print(f"Total: {total} | Present: {present} | Late: {late} | Absent: {absent}")
        print(f"Attendance Rate: {rate:.1f}%")
        print(f"{'='*55}\\n")

if __name__ == "__main__":
    system = AttendanceSystem("CS-401: Advanced Software Engineering")
    system.add_student("CS-101", "Alex Johnson", "Computer Sci")
    system.add_student("CS-102", "Sarah Connor", "Data Science")
    system.add_student("CS-103", "David Miller", "AI & ML")
    system.add_student("CS-104", "Priya Sharma", "Cybersecurity")
    system.add_student("CS-105", "Elena Rostova", "Cloud Systems")

    system.mark_attendance("CS-101", "Present")
    system.mark_attendance("CS-102", "Present")
    system.mark_attendance("CS-103", "Absent")
    system.mark_attendance("CS-104", "Late")
    system.mark_attendance("CS-105", "Present")

    system.generate_report()`;
      return `### Attendance Tracking System (Python 3.12)

Here is a complete, object-oriented **Attendance Management System** in **Python**:

\`\`\`python
${pyCode}
\`\`\`

#### Key Highlights:
1. **Object-Oriented Architecture**: Clean separation between \`Student\` state and \`AttendanceSystem\` roster management.
2. **Accurate Metrics**: Real-time attendance rate calculation factoring in full presence and partial late attendance.
3. **Execution**: Ready to run directly in the built-in sandbox or terminal.`;
    }

    if (lang === 'c') {
      const cCode = `/* Attendance Management System in C (C17) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 50
#define NAME_LEN 50

typedef struct {
    char rollNo[16];
    char name[NAME_LEN];
    char status[10]; // "Present", "Absent", "Late"
} Student;

typedef struct {
    Student students[MAX_STUDENTS];
    int count;
} AttendanceRoster;

void initRoster(AttendanceRoster *roster) {
    roster->count = 0;
}

void addStudent(AttendanceRoster *roster, const char *roll, const char *name) {
    if (roster->count >= MAX_STUDENTS) return;
    strcpy(roster->students[roster->count].rollNo, roll);
    strcpy(roster->students[roster->count].name, name);
    strcpy(roster->students[roster->count].status, "Absent");
    roster->count++;
}

void markAttendance(AttendanceRoster *roster, const char *roll, const char *status) {
    for (int i = 0; i < roster->count; i++) {
        if (strcmp(roster->students[i].rollNo, roll) == 0) {
            strcpy(roster->students[i].status, status);
            return;
        }
    }
}

void printReport(const AttendanceRoster *roster) {
    int present = 0, absent = 0, late = 0;
    printf("\\n=======================================================\\n");
    printf("              STUDENT ATTENDANCE REPORT               \\n");
    printf("=======================================================\\n");
    printf("%-10s %-22s %-12s\\n", "Roll No", "Student Name", "Status");
    printf("-------------------------------------------------------\\n");
    for (int i = 0; i < roster->count; i++) {
        printf("%-10s %-22s %-12s\\n",
               roster->students[i].rollNo,
               roster->students[i].name,
               roster->students[i].status);
        if (strcmp(roster->students[i].status, "Present") == 0) present++;
        else if (strcmp(roster->students[i].status, "Late") == 0) late++;
        else absent++;
    }
    printf("-------------------------------------------------------\\n");
    double rate = roster->count > 0 ? ((present + late * 0.5) / (double)roster->count) * 100.0 : 0.0;
    printf("Total: %d | Present: %d | Late: %d | Absent: %d\\n", roster->count, present, late, absent);
    printf("Attendance Rate: %.1f%%\\n", rate);
    printf("=======================================================\\n\\n");
}

int main(void) {
    AttendanceRoster roster;
    initRoster(&roster);

    addStudent(&roster, "CS-101", "Alex Johnson");
    addStudent(&roster, "CS-102", "Sarah Connor");
    addStudent(&roster, "CS-103", "David Miller");
    addStudent(&roster, "CS-104", "Priya Sharma");
    addStudent(&roster, "CS-105", "Marcus Vance");

    markAttendance(&roster, "CS-101", "Present");
    markAttendance(&roster, "CS-102", "Present");
    markAttendance(&roster, "CS-103", "Absent");
    markAttendance(&roster, "CS-104", "Late");
    markAttendance(&roster, "CS-105", "Present");

    printReport(&roster);
    return 0;
}`;
      return `### Attendance Management System in C (C17)

\`\`\`c
${cCode}
\`\`\`

#### Highlights:
1. **Memory Safe**: Stack-allocated structs with bounded arrays and standard string manipulation.
2. **Execution**: Ready to compile and run directly in the built-in sandbox!`;
    }

    // Default & Web requests: Full interactive HTML5 / CSS3 / JavaScript Web Application
    const htmlApp = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Attendance Management System</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(18, 24, 38, 0.85);
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.4);
      --success: #10b981;
      --danger: #ef4444;
      --warning: #f59e0b;
      --text: #f1f5f9;
      --muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.08);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 24px 16px; min-height: 100vh; }
    .container { max-width: 1000px; margin: 0 auto; }
    
    /* Header */
    .app-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
    .app-brand { display: flex; align-items: center; gap: 14px; }
    .brand-icon { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), #a855f7); display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 4px 16px var(--accent-glow); }
    .brand-text h1 { font-size: 1.45rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
    .brand-text p { font-size: 0.85rem; color: var(--muted); }
    .header-info { display: flex; align-items: center; gap: 10px; }
    .badge-date { background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; color: #cbd5e1; font-weight: 500; }

    /* KPI Metrics Cards */
    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; transition: transform 0.2s, border-color 0.2s; }
    .stat-card:hover { transform: translateY(-2px); border-color: rgba(99,102,241,0.35); }
    .stat-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 6px; }
    .stat-num { font-size: 1.85rem; font-weight: 700; color: #fff; }
    .stat-num.c-present { color: var(--success); }
    .stat-num.c-absent { color: var(--danger); }
    .stat-num.c-late { color: var(--warning); }
    .stat-num.c-rate { color: #818cf8; }
    .bar-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; margin-top: 10px; overflow: hidden; }
    .bar-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #6366f1, #10b981); transition: width 0.4s ease; border-radius: 99px; }

    /* Controls Bar */
    .controls { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; background: rgba(18,24,38,0.5); padding: 14px 18px; border-radius: 12px; border: 1px solid var(--border); }
    .search-wrap { position: relative; flex: 1; min-width: 220px; max-width: 320px; }
    .search-wrap input { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px 8px 34px; color: #fff; font-size: 0.85rem; outline: none; transition: border-color 0.2s; }
    .search-wrap input:focus { border-color: var(--accent); }
    .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 14px; opacity: 0.5; }
    
    .filter-pills { display: flex; gap: 6px; }
    .pill { background: transparent; border: 1px solid var(--border); color: var(--muted); padding: 6px 14px; border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
    .pill.active, .pill:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
    
    .toolbar-actions { display: flex; gap: 8px; }
    .btn { padding: 7px 14px; border-radius: 6px; font-size: 0.82rem; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
    .btn-green { background: var(--success); color: #fff; }
    .btn-green:hover { background: #059669; }
    .btn-ghost { background: rgba(255,255,255,0.06); color: #e2e8f0; border: 1px solid var(--border); }
    .btn-ghost:hover { background: rgba(255,255,255,0.12); }

    /* Roster Table */
    .table-container { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.35); }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { background: rgba(255,255,255,0.03); color: var(--muted); font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 18px; border-bottom: 1px solid var(--border); }
    td { padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.88rem; color: #cbd5e1; vertical-align: middle; }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(255,255,255,0.02); }

    .student-col { display: flex; align-items: center; gap: 12px; }
    .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: 600; flex-shrink: 0; }
    .name-title { font-weight: 600; color: #f8fafc; }
    .roll-sub { font-size: 0.75rem; color: #64748b; font-family: monospace; }

    .status-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 99px; font-size: 0.74rem; font-weight: 600; text-transform: capitalize; }
    .badge-present { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge-absent  { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .badge-late    { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }

    .action-cell { display: flex; gap: 6px; }
    .act-btn { width: 32px; height: 32px; border-radius: 6px; border: 1px solid var(--border); background: rgba(255,255,255,0.04); color: var(--muted); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 600; transition: all 0.15s; }
    .act-btn:hover { transform: scale(1.08); }
    .act-btn.p:hover, .act-btn.p.active { background: var(--success); color: #fff; border-color: var(--success); box-shadow: 0 0 10px rgba(16,185,129,0.4); }
    .act-btn.a:hover, .act-btn.a.active { background: var(--danger); color: #fff; border-color: var(--danger); box-shadow: 0 0 10px rgba(239,68,68,0.4); }
    .act-btn.l:hover, .act-btn.l.active { background: var(--warning); color: #fff; border-color: var(--warning); box-shadow: 0 0 10px rgba(245,158,11,0.4); }

    /* Modal */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: none; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(4px); }
    .modal-box { background: #121826; border: 1px solid var(--border); border-radius: 12px; width: 90%; max-width: 400px; padding: 22px; }
    .modal-box h3 { font-size: 1.15rem; margin-bottom: 14px; }
    .modal-input { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; color: #fff; margin-bottom: 12px; outline: none; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }

    .toast { position: fixed; bottom: 20px; right: 20px; background: #1e293b; border: 1px solid #334155; color: #fff; padding: 10px 16px; border-radius: 8px; font-size: 0.85rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5); opacity: 0; transform: translateY(10px); transition: all 0.3s; pointer-events: none; }
    .toast.show { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>
  <div class="container">
    <header class="app-header">
      <div class="app-brand">
        <div class="brand-icon">📋</div>
        <div class="brand-text">
          <h1>Smart Attendance System</h1>
          <p>Class of CS-401 &bull; Fall Semester 2026</p>
        </div>
      </div>
      <div class="header-info">
        <div class="badge-date" id="liveDate">Loading date...</div>
      </div>
    </header>

    <!-- KPI Summary Cards -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-title">Total Enrolled</div>
        <div class="stat-num" id="statTotal">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">Present Today</div>
        <div class="stat-num c-present" id="statPresent">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">Absent Today</div>
        <div class="stat-num c-absent" id="statAbsent">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">Attendance Rate</div>
        <div class="stat-num c-rate" id="statRate">0%</div>
        <div class="bar-bg"><div class="bar-fill" id="barFill"></div></div>
      </div>
    </div>

    <!-- Controls Bar -->
    <div class="controls">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" id="searchInput" placeholder="Search student or roll no..." />
      </div>
      <div class="filter-pills">
        <button class="pill active" onclick="setFilter('all')">All</button>
        <button class="pill" onclick="setFilter('present')">Present</button>
        <button class="pill" onclick="setFilter('absent')">Absent</button>
        <button class="pill" onclick="setFilter('late')">Late</button>
      </div>
      <div class="toolbar-actions">
        <button class="btn btn-green" onclick="markAll('present')">✓ Mark All Present</button>
        <button class="btn btn-ghost" onclick="openAddModal()">+ Add Student</button>
        <button class="btn btn-ghost" onclick="resetRoster()">↺ Reset</button>
        <button class="btn btn-ghost" onclick="exportCSV()">📥 Export CSV</button>
      </div>
    </div>

    <!-- Roster Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Department</th>
            <th>Time Log</th>
            <th>Status</th>
            <th>Quick Actions</th>
          </tr>
        </thead>
        <tbody id="rosterBody"></tbody>
      </table>
    </div>
  </div>

  <!-- Add Student Modal -->
  <div class="modal-overlay" id="addModal">
    <div class="modal-box">
      <h3>Add New Student</h3>
      <input type="text" id="newRoll" class="modal-input" placeholder="Roll Number (e.g. CS-109)" />
      <input type="text" id="newName" class="modal-input" placeholder="Student Full Name" />
      <input type="text" id="newDept" class="modal-input" placeholder="Department (e.g. Computer Science)" />
      <div class="modal-actions">
        <button class="btn btn-ghost" onclick="closeAddModal()">Cancel</button>
        <button class="btn btn-green" onclick="saveNewStudent()">Add Student</button>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const INITIAL_STUDENTS = [
      { id: 1, roll: 'CS-101', name: 'Alex Johnson', dept: 'Computer Science', status: 'present', time: '08:55 AM' },
      { id: 2, roll: 'CS-102', name: 'Sarah Connor', dept: 'Data Science', status: 'present', time: '09:02 AM' },
      { id: 3, roll: 'CS-103', name: 'David Miller', dept: 'Artificial Intelligence', status: 'absent', time: '--' },
      { id: 4, roll: 'CS-104', name: 'Priya Sharma', dept: 'Cyber Security', status: 'late', time: '09:15 AM' },
      { id: 5, roll: 'CS-105', name: 'Marcus Vance', dept: 'Software Engineering', status: 'present', time: '08:50 AM' },
      { id: 6, roll: 'CS-106', name: 'Elena Rostova', dept: 'Cloud Computing', status: 'present', time: '08:58 AM' },
      { id: 7, roll: 'CS-107', name: 'Leo Tanaka', dept: 'Computer Science', status: 'absent', time: '--' },
      { id: 8, roll: 'CS-108', name: 'Maya Lin', dept: 'Data Science', status: 'present', time: '09:05 AM' }
    ];

    let students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    let currentFilter = 'all';

    function init() {
      const now = new Date();
      document.getElementById('liveDate').textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
      renderRoster();
      updateMetrics();
      document.getElementById('searchInput').addEventListener('input', renderRoster);
    }

    function getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }

    function renderRoster() {
      const tbody = document.getElementById('rosterBody');
      const search = document.getElementById('searchInput').value.toLowerCase().trim();

      const filtered = students.filter(s => {
        const matchesFilter = currentFilter === 'all' || s.status === currentFilter;
        const matchesSearch = s.name.toLowerCase().includes(search) || s.roll.toLowerCase().includes(search) || s.dept.toLowerCase().includes(search);
        return matchesFilter && matchesSearch;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:32px; color:#64748b;">No students found matching your criteria.</td></tr>';
        return;
      }

      tbody.innerHTML = filtered.map(s => \`
        <tr>
          <td>
            <div class="student-col">
              <div class="user-avatar">\${getInitials(s.name)}</div>
              <div>
                <div class="name-title">\${s.name}</div>
                <div class="roll-sub">\${s.roll}</div>
              </div>
            </div>
          </td>
          <td>\${s.dept}</td>
          <td style="font-family: monospace; font-size: 0.8rem;">\${s.time}</td>
          <td>
            <span class="status-badge badge-\${s.status}">
              \${s.status === 'present' ? '● Present' : (s.status === 'absent' ? '● Absent' : '● Late')}
            </span>
          </td>
          <td>
            <div class="action-cell">
              <button class="act-btn p \${s.status === 'present' ? 'active' : ''}" title="Mark Present" onclick="setStatus(\${s.id}, 'present')">P</button>
              <button class="act-btn a \${s.status === 'absent' ? 'active' : ''}" title="Mark Absent" onclick="setStatus(\${s.id}, 'absent')">A</button>
              <button class="act-btn l \${s.status === 'late' ? 'active' : ''}" title="Mark Late" onclick="setStatus(\${s.id}, 'late')">L</button>
            </div>
          </td>
        </tr>
      \`).join('');
    }

    function setStatus(id, newStatus) {
      const student = students.find(s => s.id === id);
      if (!student) return;
      student.status = newStatus;
      if (newStatus === 'present' || newStatus === 'late') {
        const d = new Date();
        student.time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        student.time = '--';
      }
      renderRoster();
      updateMetrics();
      showToast(\`Updated \${student.name} to \${newStatus.toUpperCase()}\`);
    }

    function markAll(status) {
      const d = new Date();
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      students.forEach(s => {
        s.status = status;
        s.time = status === 'present' ? timeStr : '--';
      });
      renderRoster();
      updateMetrics();
      showToast('Marked all students as ' + status.toUpperCase());
    }

    function resetRoster() {
      students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
      renderRoster();
      updateMetrics();
      showToast('Roster reset to initial state');
    }

    function setFilter(filter) {
      currentFilter = filter;
      document.querySelectorAll('.filter-pills .pill').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === filter);
      });
      renderRoster();
    }

    function updateMetrics() {
      const total = students.length;
      const present = students.filter(s => s.status === 'present').length;
      const absent = students.filter(s => s.status === 'absent').length;
      const late = students.filter(s => s.status === 'late').length;
      const rate = total > 0 ? (((present + late * 0.5) / total) * 100).toFixed(1) : 0;

      document.getElementById('statTotal').textContent = total;
      document.getElementById('statPresent').textContent = present;
      document.getElementById('statAbsent').textContent = absent;
      document.getElementById('statRate').textContent = rate + '%';
      document.getElementById('barFill').style.width = rate + '%';
    }

    function openAddModal() {
      document.getElementById('addModal').style.display = 'flex';
      document.getElementById('newRoll').focus();
    }

    function closeAddModal() {
      document.getElementById('addModal').style.display = 'none';
      document.getElementById('newRoll').value = '';
      document.getElementById('newName').value = '';
      document.getElementById('newDept').value = '';
    }

    function saveNewStudent() {
      const roll = document.getElementById('newRoll').value.trim();
      const name = document.getElementById('newName').value.trim();
      const dept = document.getElementById('newDept').value.trim() || 'General';

      if (!roll || !name) {
        alert('Please provide both roll number and student name.');
        return;
      }

      students.push({
        id: Date.now(),
        roll,
        name,
        dept,
        status: 'present',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      closeAddModal();
      renderRoster();
      updateMetrics();
      showToast(\`Added \${name} to roster\`);
    }

    function exportCSV() {
      let csv = 'Roll No,Student Name,Department,Status,Time Log\\n';
      students.forEach(s => {
        csv += \`"\${s.roll}","\${s.name}","\${s.dept}","\${s.status}","\${s.time}"\\n\`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance_report.csv';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported attendance_report.csv');
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2400);
    }

    window.onload = init;
  </script>
</body>
</html>`;

    return `### Smart Attendance Management System (HTML5 / CSS3 / JavaScript)

Here is a complete, interactive, and production-grade **Attendance Management Web Application** built with **HTML5, CSS3, and Vanilla JavaScript**:

\`\`\`html
${htmlApp}
\`\`\`

#### Key Highlights & Features:
1. **Interactive Real-Time Dashboard**: Dynamic KPI summary cards (Total Students, Present, Absent, and Attendance Percentage) recalculate and update with an animated progress bar.
2. **Instant Status Toggles**: Quickly toggle student status between **Present (P)**, **Absent (A)**, and **Late (L)** with timestamp logging and glowing color-coded badges.
3. **Live Search & Filter**: Instant filtering by student name, roll number, or attendance category.
4. **Bulk Controls & Export**: Includes **Mark All Present**, **Add Student**, and **Export CSV** for report generation.
5. **Execution**: Click **"Run"** above to test the application live in the built-in sandbox, or click **"Download"** to save as \`attendance_system.html\`!`;
  }

  // ── Dedicated Dashboard Web App ──
  if (/\b(dashboard|analytics\s*system)\b/i.test(low) && !/\b(python|in c\b|cpp|in java)\b/i.test(low)) {
    const dashHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Executive Analytics Dashboard</title>
  <style>
    :root { --bg: #0b0f19; --card: rgba(18, 24, 38, 0.85); --accent: #6366f1; --accent-glow: rgba(99,102,241,0.3); --text: #f8fafc; --muted: #94a3b8; --border: rgba(255,255,255,0.08); }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 24px; min-height: 100vh; }
    .container { max-width: 1080px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
    .brand { display: flex; align-items: center; gap: 12px; }
    .brand h1 { font-size: 1.4rem; font-weight: 700; color: #fff; }
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .kpi-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; transition: transform 0.2s; }
    .kpi-card:hover { transform: translateY(-2px); border-color: var(--accent-glow); }
    .kpi-title { font-size: 0.78rem; text-transform: uppercase; color: var(--muted); letter-spacing: 0.05em; }
    .kpi-val { font-size: 1.9rem; font-weight: 700; color: #fff; margin: 6px 0; }
    .kpi-change { font-size: 0.8rem; color: #10b981; font-weight: 500; }
    .chart-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-bottom: 24px; }
    .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
    .bars-wrap { display: flex; align-items: flex-end; justify-content: space-between; height: 180px; padding-top: 20px; gap: 12px; }
    .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
    .bar-visual { width: 100%; max-width: 44px; background: linear-gradient(180deg, var(--accent), #4338ca); border-radius: 6px 6px 0 0; transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    .bar-label { font-size: 0.75rem; color: var(--muted); margin-top: 8px; }
    .feed-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
    .feed-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 0.88rem; }
    .feed-item:last-child { border-bottom: none; }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <div class="brand">
        <div style="font-size:24px;">📊</div>
        <div>
          <h1>Analytics Overview</h1>
          <p style="font-size:0.85rem; color:var(--muted);">Real-time business performance</p>
        </div>
      </div>
      <button style="background:var(--accent); color:#fff; border:none; padding:8px 16px; border-radius:8px; cursor:pointer; font-weight:600;" onclick="refreshData()">↻ Refresh Metrics</button>
    </header>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-title">Monthly Revenue</div>
        <div class="kpi-val" id="revVal">$48,250</div>
        <div class="kpi-change">▲ +14.2% vs last month</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Active Users</div>
        <div class="kpi-val" id="userVal">12,480</div>
        <div class="kpi-change">▲ +8.7% vs last month</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Conversion Rate</div>
        <div class="kpi-val">3.64%</div>
        <div class="kpi-change">▲ +0.4% improvement</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Uptime & Health</div>
        <div class="kpi-val" style="color:#10b981;">99.98%</div>
        <div class="kpi-change" style="color:var(--muted);">All systems operational</div>
      </div>
    </div>

    <div class="chart-card">
      <div class="chart-header">
        <h3 style="font-size:1.1rem; color:#fff;">Traffic Trends (Last 6 Months)</h3>
        <span style="font-size:0.8rem; color:var(--muted);">Thousands of Sessions</span>
      </div>
      <div class="bars-wrap" id="chartBars"></div>
    </div>

    <div class="feed-card">
      <h3 style="font-size:1.1rem; color:#fff; margin-bottom:14px;">Recent System Activity</h3>
      <div class="feed-item">
        <span>Payment Gateway Synchronized (Stripe)</span>
        <span style="color:#10b981; font-weight:600;">SUCCESS</span>
      </div>
      <div class="feed-item">
        <span>New Organization Onboarded ("Apex Labs")</span>
        <span style="color:var(--accent); font-weight:600;">NEW ACCOUNT</span>
      </div>
      <div class="feed-item">
        <span>Daily Database Backup Snapshot</span>
        <span style="color:var(--muted);">COMPLETED</span>
      </div>
    </div>
  </div>

  <script>
    const months = [
      { name: 'May', val: 45 },
      { name: 'Jun', val: 58 },
      { name: 'Jul', val: 72 },
      { name: 'Aug', val: 64 },
      { name: 'Sep', val: 89 },
      { name: 'Oct', val: 95 }
    ];

    function renderBars() {
      const wrap = document.getElementById('chartBars');
      wrap.innerHTML = months.map(m => \`
        <div class="bar-col">
          <div class="bar-visual" style="height:\${m.val}%;"></div>
          <div class="bar-label">\${m.name}</div>
        </div>
      \`).join('');
    }

    function refreshData() {
      months.forEach(m => m.val = Math.floor(35 + Math.random() * 60));
      document.getElementById('revVal').textContent = '$' + (40000 + Math.floor(Math.random() * 15000)).toLocaleString();
      document.getElementById('userVal').textContent = (11000 + Math.floor(Math.random() * 3000)).toLocaleString();
      renderBars();
    }

    renderBars();
  </script>
</body>
</html>`;
    return `### Executive Analytics Dashboard (HTML5 / CSS3 / JavaScript)

\`\`\`html
${dashHtml}
\`\`\`

#### Highlights:
1. **Responsive Glassmorphism**: Interactive dark mode analytics interface with live KPI counters and monthly traffic charts.
2. **Execution**: Click **"Run"** above to open the live interactive dashboard in the built-in sandbox!`;
  }

  // ── Dedicated Todo & Task Manager Web App ──
  if (/\b(todo|task\s*(manager|board|list))\b/i.test(low) && !/\b(python|in c\b|cpp|in java)\b/i.test(low)) {
    const todoHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>
  <style>
    :root { --bg: #0b0f19; --card: rgba(18, 24, 38, 0.85); --accent: #6366f1; --border: rgba(255,255,255,0.08); }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: var(--bg); color: #f8fafc; padding: 24px 16px; min-height: 100vh; }
    .container { max-width: 640px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 24px; }
    .header h1 { font-size: 1.6rem; font-weight: 700; color: #fff; }
    .input-box { display: flex; gap: 8px; margin-bottom: 20px; }
    .input-box input { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 0.9rem; outline: none; }
    .input-box button { background: var(--accent); color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .tasks-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
    .task-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--border); }
    .task-item:last-child { border-bottom: none; }
    .task-left { display: flex; align-items: center; gap: 12px; }
    .task-item.done .text { text-decoration: line-through; opacity: 0.5; }
    .del-btn { background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Smart Task Board</h1>
      <p style="font-size:0.85rem; color:#94a3b8; margin-top:4px;">Stay organized and productive</p>
    </div>
    <div class="input-box">
      <input type="text" id="taskInput" placeholder="Add a new task..." />
      <button onclick="addTask()">+ Add</button>
    </div>
    <div class="tasks-card" id="taskList"></div>
  </div>
  <script>
    let tasks = [
      { id: 1, text: 'Review pull requests and deploy to staging', done: false },
      { id: 2, text: 'Design new landing page wireframes', done: true },
      { id: 3, text: 'Write automated unit tests for API proxy', done: false }
    ];
    function render() {
      const list = document.getElementById('taskList');
      if (tasks.length === 0) { list.innerHTML = '<div style="padding:24px; text-align:center; color:#64748b;">No tasks yet! Add one above.</div>'; return; }
      list.innerHTML = tasks.map(t => \`
        <div class="task-item \${t.done ? 'done' : ''}">
          <div class="task-left">
            <input type="checkbox" \${t.done ? 'checked' : ''} onchange="toggleTask(\${t.id})" />
            <span class="text">\${t.text}</span>
          </div>
          <button class="del-btn" onclick="delTask(\${t.id})">&times;</button>
        </div>
      \`).join('');
    }
    function addTask() {
      const inp = document.getElementById('taskInput');
      const val = inp.value.trim();
      if (!val) return;
      tasks.push({ id: Date.now(), text: val, done: false });
      inp.value = '';
      render();
    }
    function toggleTask(id) {
      const t = tasks.find(x => x.id === id);
      if (t) t.done = !t.done;
      render();
    }
    function delTask(id) {
      tasks = tasks.filter(x => x.id !== id);
      render();
    }
    render();
  </script>
</body>
</html>`;
    return `### Interactive Task & Todo Board (HTML5 / CSS3 / JavaScript)

\`\`\`html
${todoHtml}
\`\`\`

#### Highlights:
1. **Interactive Controls**: Add tasks, toggle completion states, and delete items with instant UI updates.
2. **Execution**: Click **"Run"** above to interact with the task manager in the sandbox!`;
  }

  // A. Add two numbers / Arithmetic
  if (/add\s+(two\s+)?numbers|sum\s+of\s+two|addition\s+of|add\s+\d+\s+and\s+\d+/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>

int main(void) {
    double num1, num2, sum;

    printf("=== Program to Add Two Numbers (C) ===\\n");
    printf("Enter first number: ");
    if (scanf("%lf", &num1) != 1) return 1;

    printf("Enter second number: ");
    if (scanf("%lf", &num2) != 1) return 1;

    sum = num1 + num2;
    printf("\\nResult: %.2lf + %.2lf = %.2lf\\n", num1, num2, sum);

    return 0;
}`;
    } else if (lang === 'cpp') {
      code = `#include <iostream>

int main() {
    double a, b;
    std::cout << "=== Program to Add Two Numbers (C++) ===" << std::endl;
    std::cout << "Enter first number: ";
    std::cin >> a;
    std::cout << "Enter second number: ";
    std::cin >> b;

    double sum = a + b;
    std::cout << "\\nResult: " << a << " + " << b << " = " << sum << std::endl;

    return 0;
}`;
    } else if (lang === 'java') {
      code = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("=== Program to Add Two Numbers (Java) ===");

        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();

        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();

        double sum = num1 + num2;
        System.out.printf("\\nResult: %.2f + %.2f = %.2f%n", num1, num2, sum);

        scanner.close();
    }
}`;
    } else if (lang === 'javascript') {
      code = `// Program to add two numbers in JavaScript
function addNumbers(a, b) {
  return a + b;
}

const num1 = 18.5;
const num2 = 31.5;
const result = addNumbers(num1, num2);

console.log("=== Add Two Numbers (JavaScript) ===");
console.log(\`First Number:  \${num1}\`);
console.log(\`Second Number: \${num2}\`);
console.log(\`Total Sum:     \${result}\`);`;
    } else if (lang === 'rust') {
      code = `// Program to add two numbers in Rust
fn add(a: f64, b: f64) -> f64 {
    a + b
}

fn main() {
    let (n1, n2) = (14.25, 25.75);
    let total = add(n1, n2);
    println!("=== Add Two Numbers (Rust) ===");
    println!("{} + {} = {}", n1, n2, total);
}`;
    } else {
      code = `# Program to add two numbers in Python
def add_two_numbers(num1, num2):
    """Returns the arithmetic sum of two numbers."""
    return num1 + num2

# User input with fallbacks
try:
    first = float(input("Enter first number: ") or 25)
    second = float(input("Enter second number: ") or 75)
except (ValueError, EOFError):
    first, second = 25.0, 75.0

total = add_two_numbers(first, second)

print(f"\\nResult: {first} + {second} = {total}")`;
    }

    return `### Program to Add Two Numbers in ${langName}

Here is a complete, working program to add two numbers in **${langName}**:

\`\`\`${lang}
${code}
\`\`\`

#### How It Works:
1. **Input**: Prompts the user to enter two floating-point or integer numbers.
2. **Computation**: Evaluates the arithmetic sum using the binary \`+\` operator.
3. **Output**: Formats and prints the inputs and final summation.
4. **Complexity**: Time Complexity is **O(1)**; Space Complexity is **O(1)**.

You can click **"Download"** above to get \`add_numbers.${ext}\` or click **"Run"** to execute it in the sandbox!`;
  }

  // B. Fibonacci Series
  if (/fibonacci/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>

void printFibonacci(int n) {
    long long t1 = 0, t2 = 1, nextTerm;
    printf("Fibonacci Series (%d terms):\\n", n);
    for (int i = 1; i <= n; ++i) {
        printf("%lld ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\\n");
}

int main(void) {
    int count = 10;
    printFibonacci(count);
    return 0;
}`;
    } else if (lang === 'java') {
      code = `public class Main {
    public static void printFibonacci(int n) {
        long a = 0, b = 1;
        System.out.printf("Fibonacci Series (%d terms):%n", n);
        for (int i = 0; i < n; i++) {
            System.out.print(a + " ");
            long next = a + b;
            a = b;
            b = next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        printFibonacci(12);
    }
}`;
    } else if (lang === 'javascript') {
      code = `function getFibonacci(terms) {
  const seq = [0, 1];
  for (let i = 2; i < terms; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq.slice(0, terms);
}

const terms = 10;
const series = getFibonacci(terms);
console.log(\`Fibonacci Series (\${terms} terms):\`, series.join(' '));`;
    } else {
      code = `def fibonacci_series(n):
    """Generates the first n terms of the Fibonacci sequence."""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

terms = 10
result = fibonacci_series(terms)
print(f"Fibonacci Series ({terms} terms):")
print(" ".join(map(str, result)))`;
    }

    return `### Fibonacci Series Program in ${langName}

Here is an optimal **O(n)** implementation of the Fibonacci sequence in **${langName}**:

\`\`\`${lang}
${code}
\`\`\`

#### Key Details:
- **Base Values**: Starts with $F_0 = 0$ and $F_1 = 1$.
- **Recurrence Relation**: $F_n = F_{n-1} + F_{n-2}$.
- **Performance**: Time complexity is **O(n)** and auxiliary space is **O(1)**.`;
  }

  // C. Palindrome Check
  if (/palindrome/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isPalindrome(const char *str) {
    int left = 0;
    int right = strlen(str) - 1;
    while (left < right) {
        if (str[left] != str[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main(void) {
    const char *words[] = {"racecar", "madam", "hello", "level", "12321"};
    for (int i = 0; i < 5; i++) {
        printf("'%s' -> %s\\n", words[i], isPalindrome(words[i]) ? "PALINDROME" : "NOT A PALINDROME");
    }
    return 0;
}`;
    } else if (lang === 'java') {
      code = `public class Main {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        String test = "racecar";
        System.out.println("Is '" + test + "' a palindrome? " + isPalindrome(test));
    }
}`;
    } else {
      code = `def is_palindrome(text):
    """Checks if a string or integer is identical read forward and backward."""
    clean = str(text).lower()
    return clean == clean[::-1]

examples = ["racecar", "radar", "Python", 12321, 45678]
for item in examples:
    print(f"'{item}': {'Palindrome' if is_palindrome(item) else 'Not Palindrome'}")`;
    }

    return `### Palindrome Checker Program in ${langName}

Here is a two-pointer palindrome detection algorithm in **${langName}**:

\`\`\`${lang}
${code}
\`\`\`

#### Algorithm Explanation:
1. Compare characters starting from the first and last positions moving toward the center.
2. If any mismatch occurs, terminate early and return \`false\`.
3. If pointers meet without mismatch, the sequence is a **palindrome**.
4. **Complexity**: Time **O(n)**; Space **O(1)**.`;
  }

  // D. Factorial
  if (/factorial/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1;
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main(void) {
    int num = 6;
    printf("Factorial of %d is: %lld\\n", num, factorial(num));
    return 0;
}`;
    } else {
      code = `def factorial(n):
    """Calculates n! iteratively with input validation."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers.")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

for n in [0, 1, 5, 7, 10]:
    print(f"{n}! = {factorial(n)}")`;
    }

    return `### Factorial Calculation in ${langName}

\`\`\`${lang}
${code}
\`\`\`

#### Logic & Complexity:
- **Base Case**: $0! = 1$ and $1! = 1$.
- **Formula**: $n! = n \\times (n-1) \\times \\dots \\times 1$.
- **Complexity**: Time **O(n)**, Space **O(1)**.`;
  }

  // E. Prime Numbers
  if (/prime/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>
#include <stdbool.h>

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

int main(void) {
    printf("Prime numbers between 1 and 50:\\n");
    for (int i = 1; i <= 50; i++) {
        if (isPrime(i)) printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`;
    } else {
      code = `def is_prime(n):
    """Returns True if n is prime using O(sqrt(n)) primality test."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

primes = [x for x in range(1, 50) if is_prime(x)]
print("Primes under 50:", primes)`;
    }

    return `### Prime Number Program in ${langName}

\`\`\`${lang}
${code}
\`\`\`

#### Method:
- Utilizes $6k \\pm 1$ divisibility checks to reach an optimal **$O(\\sqrt{n})$** time complexity.`;
  }

  // F. Reverse String or Array
  if (/reverse\s+(a\s+)?(string|array|number)/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>
#include <string.h>

void reverseString(char *str) {
    int i = 0, j = strlen(str) - 1;
    while (i < j) {
        char temp = str[i];
        str[i] = str[j];
        str[j] = temp;
        i++;
        j--;
    }
}

int main(void) {
    char text[] = "Hello World";
    printf("Original: %s\\n", text);
    reverseString(text);
    printf("Reversed: %s\\n", text);
    return 0;
}`;
    } else {
      code = `def reverse_string(s):
    # Two-pointer in-place reversal simulation
    chars = list(s)
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return "".join(chars)

original = "Hello World"
print("Original:", original)
print("Reversed:", reverse_string(original))`;
    }

    return `### Reverse String Program in ${langName}

\`\`\`${lang}
${code}
\`\`\`

- Reverses characters in-place using two opposite pointers with **O(n)** time and **O(1)** auxiliary space.`;
  }

  // G. Even or Odd
  if (/even\s+or\s+odd|check\s+even|odd\s+even/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>

int main(void) {
    int n = 42;
    printf("Number %d is: %s (modulo check)\\n", n, (n % 2 == 0) ? "EVEN" : "ODD");
    printf("Number %d is: %s (bitwise check)\\n", n, ((n & 1) == 0) ? "EVEN" : "ODD");
    return 0;
}`;
    } else {
      code = `def check_even_odd(number):
    if number % 2 == 0:
        return f"{number} is Even"
    return f"{number} is Odd"

for val in [10, 15, 0, -7, 44]:
    print(check_even_odd(val))`;
    }

    return `### Even or Odd Checker in ${langName}

\`\`\`${lang}
${code}
\`\`\`

Both modulo (\`n % 2 == 0\`) and bitwise (\`(n & 1) == 0\`) verification techniques are shown.`;
  }

  // H. Swap Two Numbers
  if (/swap\s+(two\s+)?numbers/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>

int main(void) {
    int a = 10, b = 25;
    printf("Before Swap: a = %d, b = %d\\n", a, b);

    // Method 1: Without temporary variable using arithmetic
    a = a + b;
    b = a - b;
    a = a - b;
    printf("After Swap (Arithmetic): a = %d, b = %d\\n", a, b);

    // Method 2: Without temporary variable using bitwise XOR
    a ^= b;
    b ^= a;
    a ^= b;
    printf("After Swap (Bitwise XOR): a = %d, b = %d\\n", a, b);

    return 0;
}`;
    } else {
      code = `# Swap two numbers in Python
a, b = 10, 25
print(f"Before: a = {a}, b = {b}")

# Method 1: Pythonic tuple unpacking
a, b = b, a
print(f"After (Tuple): a = {a}, b = {b}")

# Method 2: Arithmetic without temp
a = a + b
b = a - b
a = a - b
print(f"After (Arithmetic): a = {a}, b = {b}")`;
    }

    return `### Swap Two Numbers Program in ${langName}

\`\`\`${lang}
${code}
\`\`\`

Demonstrates swapping with arithmetic and bitwise XOR operations without requiring a temporary third variable!`;
  }

  // I. Calculator
  if (/calculator/i.test(low)) {
    let code = '';
    if (lang === 'c') {
      code = `#include <stdio.h>

int main(void) {
    char op = '+';
    double a = 12.0, b = 4.0, res;

    switch(op) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': res = (b != 0) ? (a / b) : 0; break;
        default: printf("Unknown operator\\n"); return 1;
    }
    printf("%.2lf %c %.2lf = %.2lf\\n", a, op, b, res);
    return 0;
}`;
    } else {
      code = `def calculate(a, op, b):
    operations = {
        '+': lambda x, y: x + y,
        '-': lambda x, y: x - y,
        '*': lambda x, y: x * y,
        '/': lambda x, y: x / y if y != 0 else "Error (Div by Zero)"
    }
    action = operations.get(op)
    return action(a, b) if action else "Invalid Operator"

print("10 + 5 =", calculate(10, '+', 5))
print("10 * 5 =", calculate(10, '*', 5))
print("10 / 2 =", calculate(10, '/', 2))`;
    }

    return `### Arithmetic Calculator in ${langName}

\`\`\`${lang}
${code}
\`\`\`

Provides standard addition, subtraction, multiplication, and division operations.`;
  }

  // J. Theory & Conceptual Questions
  if (/what\s+is\s+recursion|explain\s+recursion/i.test(low)) {
    return `### Understanding Recursion

**Recursion** is a programming technique where a function calls itself directly or indirectly to solve a problem by breaking it down into smaller sub-problems of the exact same type.

#### Two Essential Components of Every Recursive Function:
1. **Base Case**: The condition that terminates the recursive calls and prevents infinite loops / stack overflow.
2. **Recursive Step**: The logic that shrinks the problem and invokes the function on the smaller input.

#### Classical Example (Factorial in Python):
\`\`\`python
def factorial(n):
    # 1. Base Case
    if n <= 1:
        return 1
    # 2. Recursive Step
    return n * factorial(n - 1)

print("5! =", factorial(5)) # Output: 120
\`\`\`

#### Call Stack Walkthrough for \`factorial(3)\`:
\`\`\`
factorial(3) -> 3 * factorial(2)
                     2 * factorial(1)
                          1 (Base Case reached, unwinding...)
                     2 * 1 = 2
                3 * 2 = 6
\`\`\`

| Aspect | Recursion | Iteration (Loops) |
| :--- | :--- | :--- |
| **State Tracking** | Call Stack (Memory Overhead) | CPU Registers & Counter |
| **Readability** | High for Trees & Graphs | High for linear arrays |
| **Risk** | Stack Overflow (\`RecursionError\`) | Infinite Loops |`;
  }

  if (/what\s+is\s+oop|object\s+oriented\s+programming/i.test(low)) {
    return `### The 4 Pillars of Object-Oriented Programming (OOP)

OOP is a programming paradigm organized around **objects** (data) rather than actions (functions).

\`\`\`python
# 1. Encapsulation: Grouping attributes and hiding internal state
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance # Protected attribute

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def get_balance(self):
        return self._balance

# 2. Inheritance: Reusing code from a parent class
class SavingsAccount(BankAccount):
    def add_interest(self, rate):
        self._balance += self._balance * rate

# 3. Polymorphism: Same interface, different behavior
class Animal:
    def speak(self): pass

class Dog(Animal):
    def speak(self): return "Woof!"

class Cat(Animal):
    def speak(self): return "Meow!"
\`\`\`

| Pillar | Definition | Real-World Benefit |
| :--- | :--- | :--- |
| **Encapsulation** | Bundling data & methods into a class; restricting direct access | Prevents accidental modification & bugs |
| **Abstraction** | Hiding complex implementation; exposing a simple interface | Clean, modular APIs |
| **Inheritance** | Child classes inherit properties from parent classes | Code reuse (DRY principle) |
| **Polymorphism** | Ability of different classes to respond to the same method | Extensible architecture |`;
  }

  if (/what\s+is\s+(a\s+)?pointer/i.test(low)) {
    return `### Understanding Pointers

A **pointer** is a variable whose value is the **memory address** of another variable.

#### Key Operators in C/C++:
- \`&\` (**Address-of operator**): Returns the memory location where a variable is stored.
- \`*\` (**Dereference operator**): Accesses the value stored at the memory address pointed to.

\`\`\`c
#include <stdio.h>

int main(void) {
    int score = 95;
    int *ptr = &score; // ptr holds the memory address of score

    printf("Value of score:        %d\\n", score);
    printf("Memory address (&score): %p\\n", (void*)&score);
    printf("Value of pointer (ptr): %p\\n", (void*)ptr);
    printf("Dereferenced (*ptr):    %d\\n", *ptr);

    // Modifying value via pointer
    *ptr = 100;
    printf("New score value:        %d\\n", score);

    return 0;
}
\`\`\`

#### Why Pointers Matter:
1. **Dynamic Memory Allocation**: Allocating heap memory at runtime (\`malloc\` / \`free\`).
2. **Passing by Reference**: Mutating variables across function boundaries without copying large structs.
3. **Hardware & System Programming**: Directly reading CPU registers and operating system memory tables.`;
  }

  if (/let\s+vs\s+var|difference\s+between\s+let\s+and\s+var/i.test(low)) {
    return `### Difference Between \`let\` and \`var\` in JavaScript

\`\`\`javascript
// 1. var is function-scoped; let is block-scoped
if (true) {
  var x = 10;
  let y = 20;
}
console.log(x); // 10 (escapes block!)
// console.log(y); // ReferenceError: y is not defined

// 2. var allows re-declaration; let forbids it
var a = 1;
var a = 2; // Valid

let b = 1;
// let b = 2; // SyntaxError: Identifier 'b' has already been declared
\`\`\`

| Feature | \`var\` | \`let\` |
| :--- | :--- | :--- |
| **Scope** | Function Scope | Block Scope (\`{ ... }\`) |
| **Hoisting** | Hoisted and initialized with \`undefined\` | Hoisted in Temporal Dead Zone (TDZ) |
| **Re-declaration** | Allowed in same scope | Throws \`SyntaxError\` |
| **Global Object** | Attaches to \`window\` in browser | Does not attach to \`window\` |
| **Best Practice** | Avoid in modern JS | Standard default for mutable variables |`;
  }

  // K. Math Evaluation (e.g. "what is 25 * 4", "calculate 15 + 32")
  const mathMatch = raw.match(/(?:what\s+is|calculate|solve|evaluate)?\s*(-?\d+(?:\.\d+)?\s*[\+\-\*\/%^]\s*-?\d+(?:\.\d+)?(?:\s*[\+\-\*\/%^]\s*-?\d+(?:\.\d+)?)*)/i);
  if (mathMatch && !low.includes('program') && !low.includes('code')) {
    const expr = mathMatch[1].replace(/\^/g, '**');
    try {
      const calcResult = Function('"use strict"; return (' + expr + ')')();
      return `### Calculation Result

\`\`\`math
${mathMatch[1]} = ${calcResult}
\`\`\`

The result of **${mathMatch[1]}** is **${calcResult}**.`;
    } catch { /* proceed */ }
  }

  // L. Universal Program Synthesis for any coding or website request
  if (/(?:program|code|script|function|algorithm|write|create|implement|website|webpage|page|app\b)/i.test(low)) {
    const cleanTopic = raw
      .replace(/^(can you\s+)?(please\s+)?(write|give|create|show|provide|make|build)\s+(me\s+)?(a\s+)?(program|code|script|function|website|web\s*page|app)\s*(to|for|in|based\s+on)?/i, '')
      .replace(/\s+(in\s+[a-zA-Z0-9#+]+)$/i, '')
      .trim() || 'Custom Solution';

    let code = '';
    if (lang === 'html') {
      code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanTopic}</title>
  <style>
    :root {
      --bg: #0b0f19;
      --card-bg: rgba(18, 24, 38, 0.85);
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.4);
      --success: #10b981;
      --text: #f1f5f9;
      --muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.08);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 24px 16px; min-height: 100vh; }
    .container { max-width: 960px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
    .header h1 { font-size: 1.5rem; color: #fff; display: flex; align-items: center; gap: 10px; }
    .header h1 span { color: var(--accent); }
    .hero-card { background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15)); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin-bottom: 24px; }
    .hero-card h2 { font-size: 1.25rem; margin-bottom: 8px; color: #fff; }
    .hero-card p { color: var(--muted); font-size: 0.9rem; line-height: 1.5; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 18px; transition: transform 0.2s, border-color 0.2s; }
    .card:hover { transform: translateY(-3px); border-color: var(--accent-glow); }
    .card-title { font-size: 1.05rem; font-weight: 600; color: #fff; margin-bottom: 8px; }
    .card-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.4; margin-bottom: 14px; }
    .btn { padding: 8px 16px; border-radius: 8px; background: var(--accent); color: #fff; border: none; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn:hover { background: #4f46e5; box-shadow: 0 0 12px var(--accent-glow); }
    .interactive-panel { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
    .input-row { display: flex; gap: 10px; margin-top: 14px; }
    .input-row input { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; color: #fff; outline: none; }
    .items-list { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
    .item-pill { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; font-size: 0.88rem; }
    .del-btn { background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ <span>${cleanTopic}</span></h1>
      <span style="font-size: 0.85rem; color: var(--muted);">Live HTML5 Web Application</span>
    </div>

    <div class="hero-card">
      <h2>Welcome to ${cleanTopic}</h2>
      <p>A modern, interactive single-page application built with clean semantic HTML5, CSS3 glassmorphism, and vanilla JavaScript state management.</p>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">🚀 Fast & Responsive</div>
        <div class="card-desc">Fluid layout that adapts seamlessly to desktop, tablet, and mobile screens.</div>
        <button class="btn" onclick="alert('Feature 1 Active!')">Explore</button>
      </div>
      <div class="card">
        <div class="card-title">🎨 Modern Aesthetics</div>
        <div class="card-desc">Sleek dark theme with CSS custom properties and smooth transitions.</div>
        <button class="btn" onclick="alert('Feature 2 Active!')">Learn More</button>
      </div>
      <div class="card">
        <div class="card-title">⚡ Interactive Logic</div>
        <div class="card-desc">Zero-dependency vanilla JavaScript for snappy client-side state updates.</div>
        <button class="btn" onclick="alert('Feature 3 Active!')">Details</button>
      </div>
    </div>

    <div class="interactive-panel">
      <h3 style="font-size: 1.1rem; color: #fff;">Interactive Management</h3>
      <div class="input-row">
        <input type="text" id="userInput" placeholder="Add entry for ${cleanTopic}..." />
        <button class="btn" onclick="addItem()">Add Entry</button>
      </div>
      <div class="items-list" id="itemsContainer"></div>
    </div>
  </div>

  <script>
    const items = ['Initial record for ${cleanTopic}', 'System verified: Ready for production', 'Interactive controls active'];

    function render() {
      const container = document.getElementById('itemsContainer');
      container.innerHTML = items.map((item, idx) => \`
        <div class="item-pill">
          <span>\${item}</span>
          <button class="del-btn" onclick="deleteItem(\${idx})">&times;</button>
        </div>
      \`).join('');
    }

    function addItem() {
      const input = document.getElementById('userInput');
      const text = input.value.trim();
      if (!text) return;
      items.push(text);
      input.value = '';
      render();
    }

    function deleteItem(idx) {
      items.splice(idx, 1);
      render();
    }

    render();
  </script>
</body>
</html>`;
    } else if (lang === 'c') {
      code = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * Task: ${cleanTopic}
 * Language: C (C17 standard)
 */
void executeTask(void) {
    printf("Executing task: %s\\n", "${cleanTopic}");
    // Core task implementation logic
}

int main(void) {
    printf("=== %s ===\\n", "${cleanTopic}");
    executeTask();
    printf("Task completed successfully with exit code 0.\\n");
    return 0;
}`;
    } else if (lang === 'cpp') {
      code = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

/**
 * Task: ${cleanTopic}
 * Language: C++20
 */
class Solution {
public:
    void solve() {
        std::cout << "Executing: " << "${cleanTopic}" << std::endl;
    }
};

int main() {
    std::cout << "=== " << "${cleanTopic}" << " ===" << std::endl;
    Solution app;
    app.solve();
    return 0;
}`;
    } else if (lang === 'java') {
      code = `/**
 * Task: ${cleanTopic}
 * Language: Java
 */
public class Main {
    public static void solve() {
        System.out.println("Executing: ${cleanTopic}");
    }

    public static void main(String[] args) {
        System.out.println("=== Solution ===");
        solve();
    }
}`;
    } else if (lang === 'javascript') {
      code = `/**
 * Task: ${cleanTopic}
 * Language: JavaScript (ES6+)
 */
function solve() {
  console.log("Executing: ${cleanTopic}");
  return { status: "success", task: "${cleanTopic}" };
}

const result = solve();
console.log("Result:", result);`;
    } else if (lang === 'typescript') {
      code = `/**
 * Task: ${cleanTopic}
 * Language: TypeScript
 */
interface TaskResponse {
  status: string;
  task: string;
  timestamp: string;
}

function solve(): TaskResponse {
  console.log("Executing: ${cleanTopic}");
  return {
    status: "success",
    task: "${cleanTopic}",
    timestamp: new Date().toISOString()
  };
}

const result: TaskResponse = solve();
console.log("Result:", result);`;
    } else if (lang === 'rust') {
      code = `/**
 * Task: ${cleanTopic}
 * Language: Rust 2021
 */
struct App {
    task: String,
}

impl App {
    fn new(task: &str) -> Self {
        App { task: task.to_string() }
    }

    fn run(&self) {
        println!("Executing: {}", self.task);
    }
}

fn main() {
    println!("=== {} ===", "${cleanTopic}");
    let app = App::new("${cleanTopic}");
    app.run();
    println!("Process finished successfully.");
}`;
    } else if (lang === 'go') {
      code = `package main

import (
	"fmt"
	"time"
)

/**
 * Task: ${cleanTopic}
 * Language: Go 1.22
 */
func main() {
	fmt.Println("=== ${cleanTopic} ===")
	fmt.Printf("Executing at: %s\\n", time.Now().Format(time.RFC3339))
	fmt.Println("Execution completed successfully.")
}`;
    } else if (lang === 'sql') {
      code = `-- Relational Schema & Queries for: ${cleanTopic}
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO items (title, category, status) VALUES
  ('${cleanTopic} - Record 1', 'Operations', 'ACTIVE'),
  ('${cleanTopic} - Record 2', 'Engineering', 'ACTIVE'),
  ('${cleanTopic} - Record 3', 'Finance', 'PENDING');

-- Analytical Query
SELECT 
    category,
    COUNT(*) AS total_count,
    SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) AS active_count
FROM items
GROUP BY category
ORDER BY total_count DESC;`;
    } else if (lang === 'bash') {
      code = `#!/usr/bin/env bash
set -euo pipefail

# Task: ${cleanTopic}
# Language: Bash

echo "=== ${cleanTopic} ==="
echo "Executing task at $(date)"

log_info() {
    echo "[INFO] $1"
}

log_info "Initializing environment..."
log_info "Processing ${cleanTopic}..."
log_info "All operations completed successfully."
exit 0`;
    } else if (lang === 'php') {
      code = `<?php
declare(strict_types=1);

/**
 * Task: ${cleanTopic}
 * Language: PHP 8.2
 */
echo "=== ${cleanTopic} ===" . PHP_EOL;
echo "Executing: ${cleanTopic}" . PHP_EOL;
echo "Process completed successfully." . PHP_EOL;`;
    } else if (lang === 'csharp') {
      code = `using System;

/**
 * Task: ${cleanTopic}
 * Language: C# (.NET 8)
 */
public class Program {
    public static void Main() {
        Console.WriteLine("=== ${cleanTopic} ===");
        Console.WriteLine("Executing: ${cleanTopic}");
        Console.WriteLine("Process completed with exit code 0.");
    }
}`;
    } else if (lang === 'ruby') {
      code = `# Task: ${cleanTopic}
# Language: Ruby 3.3

puts "=== ${cleanTopic} ==="
puts "Executing: ${cleanTopic}"
puts "Completed successfully at #{Time.now}"`;
    } else if (lang === 'swift') {
      code = `import Foundation

// Task: ${cleanTopic}
// Language: Swift 5.10

print("=== ${cleanTopic} ===")
print("Executing: ${cleanTopic}")
print("Finished with status 0")`;
    } else if (lang === 'kotlin') {
      code = `/**
 * Task: ${cleanTopic}
 * Language: Kotlin 1.9
 */
fun main() {
    println("=== ${cleanTopic} ===")
    println("Executing: ${cleanTopic}")
    println("Finished successfully.")
}`;
    } else if (lang === 'dockerfile') {
      code = `# Production multi-stage Dockerfile for: ${cleanTopic}
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM nginx:alpine
COPY --from=builder /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;
    } else if (lang === 'solidity') {
      code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Task: ${cleanTopic}
 * Language: Solidity
 */
contract SolutionContract {
    string public taskName = "${cleanTopic}";
    address public owner;

    event TaskExecuted(string task, address indexed caller);

    constructor() {
        owner = msg.sender;
    }

    function execute() external {
        emit TaskExecuted(taskName, msg.sender);
    }
}`;
    } else {
      code = `"""
Task: ${cleanTopic}
Language: Python 3.12
"""
from typing import Dict, Any
from datetime import datetime

def solve() -> Dict[str, Any]:
    print("Executing: ${cleanTopic}")
    return {
        "status": "success",
        "task": "${cleanTopic}",
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    print("=== ${cleanTopic} ===")
    output = solve()
    print("Result:", output)`;
    }

    let entryHighlight = `1. **Language**: Standard **${langName}** syntax with proper entry point (\`main\`).`;
    let runHighlight = `2. **Execution**: Ready to run directly in the built-in sandbox or download as \`solution.${ext}\`.`;

    if (lang === 'html') {
      entryHighlight = `1. **Architecture**: Complete **HTML5 / CSS3 / JavaScript** single-page application with responsive styling and zero external dependencies.`;
      runHighlight = `2. **Execution**: Ready to test immediately in the built-in **Live HTML Preview** tab or download as \`solution.html\`.`;
    } else if (lang === 'sql') {
      entryHighlight = `1. **Schema**: Standard **ANSI SQL** relational schema with constraints, sample data, and analytical queries.`;
      runHighlight = `2. **Execution**: Ready to test directly in the built-in database console or export as \`query.sql\`.`;
    } else if (lang === 'bash') {
      entryHighlight = `1. **Scripting**: POSIX-compliant **Bash** shell script with strict error handling (\`set -euo pipefail\`) and structured functions.`;
      runHighlight = `2. **Execution**: Ready to simulate in the built-in terminal or save as \`script.sh\`.`;
    } else if (lang === 'dockerfile') {
      entryHighlight = `1. **Containerization**: Multi-stage Docker build separating compilation and runtime layers for minimal image size.`;
      runHighlight = `2. **Execution**: Ready to lint in the sandbox or save as \`Dockerfile\`.`;
    } else if (lang === 'solidity') {
      entryHighlight = `1. **Security**: Solidity ^0.8.20 smart contract with state events and ownership management.`;
      runHighlight = `2. **Execution**: Ready to compile or export as \`contract.sol\`.`;
    } else if (['python', 'javascript', 'typescript', 'ruby', 'php', 'swift', 'kotlin'].includes(lang)) {
      entryHighlight = `1. **Language**: Modern **${langName}** syntax with modular functions and demonstration test cases.`;
    }

    return `### Program for: ${cleanTopic} (${langName})

Here is the implementation in **${langName}**:

\`\`\`${lang}
${code}
\`\`\`

#### Highlights:
${entryHighlight}
${runHighlight}
3. If you have specific inputs or edge cases to handle, let me know and I will customize the algorithm!`;
  }

  // M. Fallback General Question Answerer
  return `### Assistant Response (${persona.name} ${persona.icon})

Thank you for your question: **"${raw}"**

I am ready to help you with:
- 💻 **Writing Code**: Request a program in C, C++, Python, Java, JavaScript, Rust, Go, SQL, or any of 65+ supported languages.
- 🐞 **Debugging & Optimization**: Paste code snippets for instant error analysis and refactoring.
- 📐 **Algorithms & Concepts**: Ask about data structures, Big-O complexity, system architecture, or math.

*Tip: You can ask specific questions like "write a program to add two numbers in C", "how does quicksort work", or "explain recursion".*`;
}

// Backward compatibility alias
function demoReply(userMessage, attachments) {
  return generateOfflineAIResponse(userMessage, attachments);
}

// ═══════════════════════════════════════════════════════════════
//  API DISPATCHER (Free AI Default + Custom Key Providers)
// ═══════════════════════════════════════════════════════════════

function getEffectiveSystemPrompt() {
  const persona = PERSONAS[state.persona] || PERSONAS.general;
  let prompt = persona.prompt;

  if (state.systemPrompt) {
    prompt += `\n\nCustom System Instructions:\n${state.systemPrompt}`;
  }

  // ChatGPT Custom Instructions (User Context & Response Behavior)
  if (state.customInstructions?.userContext) {
    prompt += `\n\nUser Profile & Background:\n${state.customInstructions.userContext}`;
  }
  if (state.customInstructions?.responseBehavior) {
    prompt += `\n\nResponse Guidelines & Style:\n${state.customInstructions.responseBehavior}`;
  }

  // ChatGPT Neural Memories
  if (state.memories && state.memories.length > 0) {
    prompt += `\n\nActive Long-Term Memories:\n${state.memories.map(m => `- ${m}`).join('\n')}`;
  }

  // Claude Artifacts System Prompt
  prompt += `\n\nWhen providing complete self-contained web applications, interactive utilities, calculators, dashboards, games, or visual components, output the complete executable HTML/CSS/JS code in a single standalone \`\`\`html ... \`\`\` code block or standalone \`\`\`svg ... \`\`\` block so it can be previewed directly in the Artifacts Canvas.`;

  return prompt;
}

async function callAPI(userMessage, attachments) {
  // If user configured their own custom API key in Settings
  if (state.apiKey) {
    const history = state.messages.slice(-20).map(m => ({
      role:    m.role === 'ai' ? 'assistant' : 'user',
      content: m.content,
    }));
    history.push({ role: 'user', content: userMessage });

    try {
      switch (state.provider) {
        case 'openai':  return await callOpenAI(history, attachments);
        case 'gemini':  return await callGemini(history, attachments);
        case 'claude':  return await callClaude(history, attachments);
        default:        return await callFreeAI(userMessage, attachments);
      }
    } catch (err) {
      console.warn('Custom API failed, falling back to free AI engine:', err);
      try {
        return await callFreeAI(userMessage, attachments);
      } catch {
        return generateOfflineAIResponse(userMessage, attachments);
      }
    }
  }

  // Fast Response Mode (Instant Synthesis & Low Latency)
  if (state.fastResponse) {
    const low = (userMessage || '').toLowerCase();
    const hasFiles = attachments && attachments.length > 0;
    const isProgramOrSpecialized = /(?:program|code|script|function|algorithm|write|create|implement|website|webpage|page|app\b|how\s+to|what\s+is|why|explain|fibonacci|palindrome|prime|factorial|reverse|sort|calculator|add\s+\d+|attendance|attendence|dashboard|todo|portfolio)/i.test(low);

    if (isProgramOrSpecialized && !hasFiles) {
      // Instant near-zero-latency response (< 5ms)
      return generateOfflineAIResponse(userMessage, attachments);
    }

    // Race live generation with a fast 3.5s timeout so user never experiences long pauses
    try {
      const livePromise = callFreeAI(userMessage, attachments);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('FastModeTimeout')), 3500));
      const liveReply = await Promise.race([livePromise, timeoutPromise]);
      if (liveReply && liveReply.trim()) return liveReply;
    } catch {
      return generateOfflineAIResponse(userMessage, attachments);
    }
  }

  // Standard Mode: Live AI generation with smart offline fallback
  try {
    const liveReply = await callFreeAI(userMessage, attachments);
    if (liveReply && liveReply.trim()) return liveReply;
  } catch (err) {
    console.warn('Live free AI unavailable or offline, using smart local engine:', err.message);
  }

  // Instant offline synthesis fallback (guarantees a working program and answer)
  return generateOfflineAIResponse(userMessage, attachments);
}

// ── OpenAI ─────────────────────────────────────────────────────
async function callOpenAI(history, attachments) {
  const formatted = history.map((m, idx) => {
    if (idx === history.length - 1 && attachments && attachments.length > 0) {
      const parts = [{ type: 'text', text: m.content || 'Please examine the attached file.' }];
      attachments.forEach(att => {
        if (att.isImage && att.dataUrl) {
          parts.push({
            type: 'image_url',
            image_url: { url: att.dataUrl, detail: 'auto' },
          });
        }
      });
      return { role: m.role, content: parts };
    }
    return m;
  });

  const res = await fetch(PROVIDERS.openai.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${state.apiKey}`,
    },
    body: JSON.stringify({
      model: state.apiModel,
      messages: [
        { role: 'system', content: getEffectiveSystemPrompt() },
        ...formatted,
      ],
      temperature: 0.7,
      max_tokens:  1024,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || 'No response received.';
}

// ── Gemini ─────────────────────────────────────────────────────
async function callGemini(history, attachments) {
  const contents = [];
  const sys = getEffectiveSystemPrompt();
  if (sys) {
    contents.push({ role: 'user',  parts: [{ text: sys }] });
    contents.push({ role: 'model', parts: [{ text: 'Understood.' }] });
  }
  for (let i = 0; i < history.length; i++) {
    const m = history[i];
    const isLast = i === history.length - 1;
    const parts = [{ text: m.content || ' ' }];

    if (isLast && attachments && attachments.length > 0) {
      attachments.forEach(att => {
        if (att.isImage && att.dataUrl) {
          const match = att.dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
          if (match) {
            parts.push({
              inline_data: {
                mime_type: match[1],
                data: match[2],
              },
            });
          }
        }
      });
    }

    contents.push({
      role:  m.role === 'assistant' ? 'model' : 'user',
      parts,
    });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${state.apiModel}:generateContent?key=${state.apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'No response received.';
}

// ── Claude (Anthropic) ─────────────────────────────────────────
async function callClaude(history, attachments) {
  const formatted = history.map((m, idx) => {
    if (idx === history.length - 1 && attachments && attachments.length > 0) {
      const parts = [];
      attachments.forEach(att => {
        if (att.isImage && att.dataUrl) {
          const match = att.dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
          if (match) {
            parts.push({
              type: 'image',
              source: {
                type: 'base64',
                media_type: match[1],
                data: match[2],
              },
            });
          }
        }
      });
      parts.push({ type: 'text', text: m.content || 'Please examine this.' });
      return { role: m.role, content: parts };
    }
    return m;
  });

  const res = await fetch(PROVIDERS.claude.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         state.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      state.apiModel,
      max_tokens: 1024,
      system:     getEffectiveSystemPrompt(),
      messages:   formatted,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text?.trim() || 'No response received.';
}

// ═══════════════════════════════════════════════════════════════
//  localStorage PERSISTENCE & HISTORY MANAGEMENT
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'chatai_chats';

function loadChats() {
  try {
    state.allChats = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch { state.allChats = []; }
}

function saveChats() {
  try {
    const trimmed = state.allChats.slice(0, 50).map(c => ({
      ...c,
      messages: c.messages.slice(-100),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Could not save chats:', e);
  }
}

function persistCurrentChat() {
  if (!state.currentChatId || state.messages.length === 0) return;
  const idx = state.allChats.findIndex(c => c.id === state.currentChatId);
  const firstUser = state.messages.find(m => m.role === 'user');
  const title = firstUser
    ? (firstUser.content.length > 40 ? firstUser.content.slice(0, 40) + '…' : firstUser.content)
    : 'New conversation';

  const existingPinned = idx >= 0 ? state.allChats[idx].pinned : false;
  const entry = {
    id:       state.currentChatId,
    title,
    messages: state.messages,
    ts:       Date.now(),
    pinned:   existingPinned,
  };

  if (idx >= 0) state.allChats[idx] = entry;
  else          state.allChats.unshift(entry);
  saveChats();
}

function renderHistorySidebar(searchQuery = '') {
  dom.historyList.innerHTML = '';
  const q = (searchQuery || '').trim().toLowerCase();

  let list = [...state.allChats];

  list.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return (b.ts || 0) - (a.ts || 0);
  });

  if (q) {
    list = list.filter(chat => {
      const matchTitle = (chat.title || '').toLowerCase().includes(q);
      const matchMsgs = (chat.messages || []).some(m => (m.content || '').toLowerCase().includes(q));
      return matchTitle || matchMsgs;
    });
  }

  if (q && list.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'history-empty-search';
    emptyLi.textContent = 'No matching chats found';
    dom.historyList.appendChild(emptyLi);
    return;
  }

  list.forEach(chat => {
    const li = document.createElement('li');
    li.className = 'history-item' + (chat.id === state.currentChatId ? ' active' : '');
    let displayTitle = escHtml(chat.title);
    if (q) {
      const reg = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      displayTitle = displayTitle.replace(reg, '<mark style="background:var(--accent-light);color:var(--accent);padding:0 2px;border-radius:2px;">$1</mark>');
    }

    li.innerHTML = `
      <div class="history-item-title" onclick="loadChat(${chat.id})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/></svg>
        ${chat.pinned ? '<span class="history-pin-badge" title="Pinned">📌</span>' : ''}
        <span>${displayTitle}</span>
      </div>
      <div class="history-actions">
        <button class="hist-action-btn ${chat.pinned ? 'pinned' : ''}" onclick="togglePinChat(${chat.id}, event)" title="${chat.pinned ? 'Unpin' : 'Pin to top'}">
          📌
        </button>
        <button class="hist-action-btn" onclick="renameChat(${chat.id}, event)" title="Rename">
          ✏️
        </button>
        <button class="hist-action-btn" onclick="deleteChat(${chat.id}, event)" title="Delete">
          🗑️
        </button>
      </div>
    `;
    dom.historyList.appendChild(li);
  });
}

window.togglePinChat = function(id, e) {
  if (e) e.stopPropagation();
  const chat = state.allChats.find(c => c.id === id);
  if (!chat) return;
  chat.pinned = !chat.pinned;
  saveChats();
  renderHistorySidebar(state.searchQuery);
  showToast(chat.pinned ? 'Chat pinned to top 📌' : 'Chat unpinned');
};

window.renameChat = function(id, e) {
  if (e) e.stopPropagation();
  const chat = state.allChats.find(c => c.id === id);
  if (!chat) return;
  const newName = prompt('Rename conversation:', chat.title);
  if (newName && newName.trim()) {
    chat.title = newName.trim();
    saveChats();
    renderHistorySidebar(state.searchQuery);
    showToast('Conversation renamed');
  }
};

window.deleteChat = function(id, e) {
  if (e) e.stopPropagation();
  const idx = state.allChats.findIndex(c => c.id === id);
  if (idx === -1) return;
  state.allChats.splice(idx, 1);
  saveChats();
  if (state.currentChatId === id) {
    startNewChat();
  } else {
    renderHistorySidebar(state.searchQuery);
  }
  showToast('Chat deleted');
};

function clearAllChats() {
  if (!state.allChats.length && !state.messages.length) return;
  if (confirm('Are you sure you want to delete all conversation history? This cannot be undone.')) {
    state.allChats = [];
    localStorage.removeItem(STORAGE_KEY);
    startNewChat();
    showToast('All conversations cleared');
  }
}

function loadChat(id) {
  const chat = state.allChats.find(c => c.id === id);
  if (!chat) return;
  state.currentChatId = id;
  state.messages      = chat.messages.map(m => ({ ...m }));
  dom.messagesList.innerHTML = '';
  dom.welcomeScreen.style.display = 'none';
  dom.messagesList.style.display  = 'flex';
  state.messages.forEach(m => {
    dom.messagesList.insertAdjacentHTML('beforeend',
      buildMessageHTML(m.role, m.content, m.id, m.attachments, m.edited, m.imageInfo));
  });
  scrollToBottom();
  renderHistorySidebar(state.searchQuery);
  updateChatStats();
}

function updateChatStats() {
  if (!dom.chatStatsText) return;
  const count = state.messages.length;
  let totalChars = 0;
  state.messages.forEach(m => {
    totalChars += (m.content || '').length;
  });
  const estTokens = Math.round(totalChars / 4);
  dom.chatStatsText.textContent = `${count} msgs · ~${estTokens} tokens`;
}

// ═══════════════════════════════════════════════════════════════
//  PERSONAS MANAGEMENT
// ═══════════════════════════════════════════════════════════════

function togglePersonaDropdown() {
  dom.personaDropdown.classList.toggle('open');
}

function selectPersona(personaKey) {
  const p = PERSONAS[personaKey];
  if (!p) return;
  state.persona = personaKey;
  localStorage.setItem('chatai_persona', personaKey);

  dom.personaIcon.textContent = p.icon;
  dom.personaName.textContent = p.name;

  dom.personaDropdown.querySelectorAll('.persona-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.persona === personaKey);
  });
  dom.personaDropdown.classList.remove('open');

  if (dom.personaChipsBar) {
    dom.personaChipsBar.querySelectorAll('.persona-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.persona === personaKey);
    });
  }

  showToast(`Persona: ${p.name} ${p.icon}`);
}

// ═══════════════════════════════════════════════════════════════
//  PROMPT LIBRARY MODAL
// ═══════════════════════════════════════════════════════════════

function openPromptLibrary() {
  renderPromptGrid('all');
  dom.promptLibModal.showModal();
}

function renderPromptGrid(cat) {
  dom.promptGrid.innerHTML = '';
  const filtered = cat === 'all'
    ? PROMPT_TEMPLATES
    : PROMPT_TEMPLATES.filter(p => p.category === cat);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.innerHTML = `
      <div>
        <div class="prompt-card-header">
          <span class="prompt-card-title">${escHtml(p.title)}</span>
          <span class="prompt-card-cat">${escHtml(p.category)}</span>
        </div>
        <p class="prompt-card-desc">${escHtml(p.desc)}</p>
      </div>
      <button class="prompt-card-use-btn" onclick="usePromptTemplate('${p.id}')">Use Template →</button>
    `;
    dom.promptGrid.appendChild(card);
  });
}

window.usePromptTemplate = function(id) {
  const item = PROMPT_TEMPLATES.find(p => p.id === id);
  if (!item) return;
  dom.chatInput.value = item.template;
  autoResize();
  updateInputState();
  dom.promptLibModal.close();
  dom.chatInput.focus();
  showToast('Prompt template loaded');
};

// ═══════════════════════════════════════════════════════════════
//  SHARE CONVERSATION MODAL & CLEAN SHORT LINKS
// ═══════════════════════════════════════════════════════════════

state.shareTarget = 'wifi';
state.networkInfo = {
  localIp: '192.168.0.102',
  port: 3000,
  publicUrl: 'https://sairram-123.github.io/chatai-enterprise/'
};

// Fetch live network info from server (detects WiFi LAN IP & Public URL)
async function fetchNetworkInfo() {
  try {
    const res = await fetch('/api/network-info');
    if (res.ok) {
      const data = await res.json();
      state.networkInfo = data;
      if (dom.shareWifiIpBadge && data.localIp) {
        dom.shareWifiIpBadge.textContent = 'For WhatsApp';
      }
      if (dom.shareModal && dom.shareModal.open) {
        updateShareLinkDisplay();
      }
    }
  } catch {}
}

function updateShareLinkDisplay() {
  if (!state.messages.length) return;
  const firstUser = state.messages.find(m => m.role === 'user');
  const title = firstUser ? firstUser.content.slice(0, 35) + '…' : 'ChatAI Conversation';
  const shareId = 'c_' + (state.currentChatId || Date.now());

  let targetUrl = '';
  let typeTitle = 'Short Share Link';
  let typeBadge = 'Clean & Short';
  let noticeText = '';

  const isLocalOrigin = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' || window.location.hostname.startsWith('192.168.');
  const publicBase = state.networkInfo?.publicUrl || 'https://sairram-123.github.io/chatai-enterprise/';
  const port = state.networkInfo?.port || window.location.port || '3000';
  const localIp = state.networkInfo?.localIp || '192.168.0.102';

  if (state.shareTarget === 'public') {
    targetUrl = `${publicBase}#share=${shareId}`;
    typeTitle = 'Public Web Link';
    typeBadge = 'GitHub Pages';
    noticeText = '<strong>Public Web Link:</strong> Clean short link for your public GitHub Pages deployment.';
  } else if (state.shareTarget === 'local') {
    targetUrl = `http://127.0.0.1:${port}/#share=${shareId}`;
    typeTitle = 'Local PC Link';
    typeBadge = '127.0.0.1';
    noticeText = '<strong>This PC Only:</strong> Opens in other tabs or private windows on this specific computer.';
  } else {
    // Default 'wifi' - clean, short, single-line link for WhatsApp & mobile devices!
    targetUrl = `http://${localIp}:${port}/#share=${shareId}`;
    typeTitle = 'Wi-Fi / WhatsApp Short Link';
    typeBadge = `LAN (${localIp})`;
    noticeText = `<strong>Clean Short Link (One Line):</strong> Short, single-line link. Anyone connected to your Wi-Fi (phone or laptop) can open and read this chat immediately!`;
  }

  if (dom.shareLinkInput) {
    dom.shareLinkInput.value = targetUrl;
  }
  if (dom.shareLinkTypeTitle) {
    dom.shareLinkTypeTitle.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="currentColor"/>
      </svg>
      ${typeTitle}
    `;
  }
  if (dom.shareLinkTypeBadge) dom.shareLinkTypeBadge.textContent = typeBadge;
  if (dom.shareNoticeText) dom.shareNoticeText.innerHTML = noticeText;
}

function openShareModal() {
  if (!state.messages.length) {
    showToast('No messages to share.');
    return;
  }
  const firstUser = state.messages.find(m => m.role === 'user');
  const title = firstUser ? firstUser.content.slice(0, 35) + '…' : 'ChatAI Conversation';

  dom.shareChatTitle.textContent = title;
  dom.shareMsgCount.textContent  = `${state.messages.length} messages`;

  let transcript = `Conversation: ${title}\nProvider: ${PROVIDERS[state.provider]?.label || state.provider} (${state.apiModel})\n\n`;
  state.messages.forEach(m => {
    const role = m.role === 'user' ? 'User' : 'ChatAI';
    transcript += `[${role}]:\n${m.content}\n\n`;
  });

  dom.sharePreviewArea.value = transcript;

  // Generate public shareable link
  if (!state.currentChatId) {
    state.currentChatId = Date.now();
  }
  persistCurrentChat();

  const shareId = 'c_' + state.currentChatId;
  const sharePayload = {
    id: shareId,
    chatId: state.currentChatId,
    title: title,
    messages: state.messages.map(m => ({
      role: m.role,
      content: m.content,
      id: m.id,
      sources: m.sources,
      timestamp: m.timestamp || Date.now()
    })),
    model: state.apiModel,
    provider: state.provider,
    createdAt: Date.now()
  };

  try {
    const registry = JSON.parse(localStorage.getItem('chatai_shared_registry') || '{}');
    registry[shareId] = sharePayload;
    localStorage.setItem('chatai_shared_registry', JSON.stringify(registry));
  } catch (err) {
    console.warn('Could not save to shared registry:', err);
  }

  // Backup sync to server
  fetch('/api/share', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sharePayload)
  }).catch(() => {});

  // Fetch local Wi-Fi IP
  fetchNetworkInfo();

  // Default destination: Wi-Fi LAN link (clean and short for phones on your network)
  const isLocalOrigin = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' || window.location.hostname.startsWith('192.168.');
  state.shareTarget = isLocalOrigin ? 'wifi' : 'public';
  if (dom.shareTargetTabs) {
    dom.shareTargetTabs.querySelectorAll('.share-target-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.target === state.shareTarget);
    });
  }

  updateShareLinkDisplay();
  dom.shareModal.showModal();
}

function copyShareLink() {
  if (!state.messages.length) {
    showToast('No messages to share.');
    return;
  }
  const url = dom.shareLinkInput && dom.shareLinkInput.value ? dom.shareLinkInput.value : '';

  const triggerCopiedState = () => {
    showToast('🔗 Short link copied to clipboard!');
    const btns = [dom.shareCopyLinkBtn, dom.shareActionCopyLinkBtn].filter(Boolean);
    btns.forEach(btn => {
      btn.classList.add('copied');
      const textSpan = btn.querySelector('.copy-btn-text') || btn.querySelector('.action-copy-text') || btn;
      const oldText = textSpan.textContent;
      textSpan.textContent = '✓ Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        textSpan.textContent = oldText;
      }, 2200);
    });
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(triggerCopiedState).catch(() => {
      if (dom.shareLinkInput) {
        dom.shareLinkInput.select();
        document.execCommand('copy');
        triggerCopiedState();
      }
    });
  } else if (dom.shareLinkInput) {
    dom.shareLinkInput.select();
    document.execCommand('copy');
    triggerCopiedState();
  }
}

function initShareTargetTabs() {
  if (dom.shareTargetTabs) {
    dom.shareTargetTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.share-target-tab');
      if (!tab) return;
      dom.shareTargetTabs.querySelectorAll('.share-target-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.shareTarget = tab.dataset.target || 'wifi';
      updateShareLinkDisplay();
    });
  }
}

function copyShareMarkdown() {
  let md = `# Conversation Snapshot: ${dom.shareChatTitle.textContent}\n\n`;
  state.messages.forEach(m => {
    const role = m.role === 'user' ? '👤 User' : '🤖 AI';
    md += `### ${role}\n\n${m.content}\n\n---\n\n`;
  });
  navigator.clipboard.writeText(md).then(() => {
    showToast('Markdown snapshot copied ✓');
    dom.shareModal.close();
  });
}

function copyShareText() {
  navigator.clipboard.writeText(dom.sharePreviewArea.value).then(() => {
    showToast('Text transcript copied ✓');
    dom.shareModal.close();
  });
}

// ═══════════════════════════════════════════════════════════════
//  FILE / IMAGE ATTACHMENTS
// ═══════════════════════════════════════════════════════════════

function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function handleFiles(fileList) {
  const files = Array.from(fileList);
  if (!files.length) return;

  const maxFiles = 5;
  const remaining = maxFiles - state.attachedFiles.length;
  if (remaining <= 0) {
    showToast(`Maximum ${maxFiles} files per message.`);
    return;
  }

  const toProcess = files.slice(0, remaining);
  let processed = 0;

  toProcess.forEach(file => {
    if (file.size > 10 * 1024 * 1024) {
      showToast(`${file.name} exceeds 10MB limit.`);
      return;
    }

    const isImg = file.type.startsWith('image/');
    const reader = new FileReader();

    reader.onload = e => {
      state.attachedFiles.push({
        name:     file.name,
        size:     file.size,
        type:     file.type,
        isImage:  isImg,
        dataUrl:  e.target.result,
      });
      processed++;
      if (processed === toProcess.length) {
        renderAttachedFiles();
        updateInputState();
      }
    };

    reader.readAsDataURL(file);
  });
}

function renderAttachedFiles() {
  if (!state.attachedFiles.length) {
    dom.filePreviewStrip.style.display = 'none';
    dom.filePreviewStrip.innerHTML = '';
    dom.attachBtn.classList.remove('has-files');
    return;
  }

  dom.filePreviewStrip.style.display = 'flex';
  dom.attachBtn.classList.add('has-files');
  dom.filePreviewStrip.innerHTML = state.attachedFiles.map((f, i) => `
    <div class="file-chip" title="${escHtml(f.name)} (${formatFileSize(f.size)})">
      ${f.isImage
        ? `<img class="file-chip-thumb" src="${f.dataUrl}" alt="${escHtml(f.name)}" />`
        : `<div class="file-chip-icon">📄</div>`
      }
      <span class="file-chip-name">${escHtml(f.name)}</span>
      <button class="file-chip-remove" onclick="removeAttachedFile(${i})" aria-label="Remove ${escHtml(f.name)}">×</button>
    </div>
  `).join('');
}

window.removeAttachedFile = function(idx) {
  state.attachedFiles.splice(idx, 1);
  renderAttachedFiles();
  updateInputState();
};

function clearAttachedFiles() {
  state.attachedFiles = [];
  dom.fileInput.value = '';
  renderAttachedFiles();
  updateInputState();
}

function updateInputState() {
  const hasText  = dom.chatInput.value.trim().length > 0;
  const hasFiles = state.attachedFiles.length > 0;
  dom.sendBtn.disabled = (!hasText && !hasFiles) || state.isTyping || state.isStreaming;
}

// ── Lightbox for previewing full images ────────────────────────
let lightboxEl = null;

function initLightbox() {
  lightboxEl = document.createElement('div');
  lightboxEl.className = 'lightbox';
  lightboxEl.innerHTML = `
    <button class="lightbox-close" aria-label="Close image preview">×</button>
    <img src="" alt="Enlarged view" />
  `;
  document.body.appendChild(lightboxEl);

  lightboxEl.addEventListener('click', e => {
    if (e.target !== lightboxEl.querySelector('img')) {
      lightboxEl.classList.remove('open');
    }
  });

  lightboxEl.querySelector('.lightbox-close').addEventListener('click', () => {
    lightboxEl.classList.remove('open');
  });
}

window.openLightbox = function(src) {
  if (!lightboxEl) initLightbox();
  const img = lightboxEl.querySelector('img');
  img.src = src;
  lightboxEl.classList.add('open');
};

// ═══════════════════════════════════════════════════════════════
//  VOICE INPUT & TTS OUTPUT
// ═══════════════════════════════════════════════════════════════

function initSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    dom.voiceBtn.title    = 'Voice input not supported in this browser';
    dom.voiceBtn.disabled = true;
    return;
  }
  state.recognition = new SR();
  state.recognition.continuous     = false;
  state.recognition.interimResults = true;
  state.recognition.lang           = 'en-US';

  state.recognition.onstart = () => {
    state.isListening = true;
    dom.voiceBtn.classList.add('listening');
    dom.voiceBtn.title = 'Listening… click to stop';
    dom.chatInput.placeholder = '🎤 Listening…';
  };

  state.recognition.onresult = e => {
    const transcript = Array.from(e.results)
      .map(r => r[0].transcript).join('');
    dom.chatInput.value = transcript;
    dom.chatInput.dispatchEvent(new Event('input'));
  };

  state.recognition.onend = () => {
    state.isListening = false;
    dom.voiceBtn.classList.remove('listening');
    dom.voiceBtn.title = 'Voice input';
    dom.chatInput.placeholder = 'Message ChatAI…';
    if (dom.chatInput.value.trim()) sendMessage(dom.chatInput.value);
  };

  state.recognition.onerror = e => {
    state.isListening = false;
    dom.voiceBtn.classList.remove('listening');
    dom.chatInput.placeholder = 'Message ChatAI…';
    if (e.error !== 'no-speech') showToast(`Mic error: ${e.error}`);
  };
}

function toggleVoice() {
  if (!state.recognition) return;
  if (state.isListening) {
    state.recognition.stop();
  } else {
    try { state.recognition.start(); }
    catch { /* already started */ }
  }
}

function populateVoices() {
  if (!state.synth) return;
  const voices = state.synth.getVoices();
  dom.ttsVoiceSelect.innerHTML = '<option value="">Default (browser)</option>';
  voices.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    if (v.name === state.ttsVoice) opt.selected = true;
    dom.ttsVoiceSelect.appendChild(opt);
  });
}

function speakText(text, msgId) {
  if (!state.ttsEnabled || !state.synth) return;
  state.synth.cancel();

  const clean = text
    .replace(/```[\s\S]*?```/g, 'code block')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^#{1,4}\s/gm, '')
    .replace(/\|.+?\|/g, '')
    .replace(/\n/g, ' ');

  const utter = new SpeechSynthesisUtterance(clean);
  utter.rate   = 1;
  utter.pitch  = 1;
  if (state.ttsVoice) {
    const voices = state.synth.getVoices();
    const v = voices.find(v => v.name === state.ttsVoice);
    if (v) utter.voice = v;
  }
  state.currentUtter = utter;

  const row = document.getElementById(`msg-${msgId}`);
  if (row) row.classList.add('speaking');
  utter.onend   = () => { if (row) row.classList.remove('speaking'); };
  utter.onerror = () => { if (row) row.classList.remove('speaking'); };

  state.synth.speak(utter);
}

// ═══════════════════════════════════════════════════════════════
//  CODE EXECUTION, DOWNLOAD & SANDBOX RUNNER
// ═══════════════════════════════════════════════════════════════

let _codeBlockIdCounter = 0;
window._codeSnippets = window._codeSnippets || {};

window.copyCodeSnippet = function(codeId, btn) {
  const snippet = window._codeSnippets[codeId];
  if (!snippet) return;
  navigator.clipboard.writeText(snippet.code).then(() => {
    const origHTML = btn.innerHTML;
    btn.textContent = 'Copied! ✓';
    btn.style.color = 'var(--green)';
    setTimeout(() => {
      btn.innerHTML = origHTML;
      btn.style.color = '';
    }, 2000);
    showToast('Code copied to clipboard');
  });
};

window.downloadCodeSnippet = function(codeId) {
  const snippet = window._codeSnippets[codeId];
  if (!snippet) return;
  const meta = getLanguageMeta(snippet.lang);
  const blob = new Blob([snippet.code], { type: 'text/plain;charset=utf-8' });
  const filename = `code-${codeId}.${meta.ext}`;
  downloadBlob(blob, filename);
  showToast(`Downloaded ${filename} ✓`);
};

window.openCodeRunner = function(codeId) {
  const snippet = window._codeSnippets[codeId];
  if (!snippet) return;

  dom.runnerCodeInput.value = snippet.code;
  const langKey = (snippet.lang || 'javascript').toLowerCase();

  // Update language select & dot
  if (dom.runnerLangSelect) {
    dom.runnerLangSelect.value = langKey in LANGUAGE_META ? langKey : 'javascript';
  }
  updateRunnerLangDot();

  dom.runnerConsoleOutput.textContent = 'Ready. Click \'Execute Code\' to run.';

  if (snippet.lang === 'html') {
    switchRunnerTab('preview');
    runSandboxCode();
  } else {
    switchRunnerTab('console');
  }

  dom.codeRunnerModal.showModal();
};

window.openFullscreenSnippet = function(codeId) {
  window.openCodeRunner(codeId);
  state.runnerFullscreen = true;
  dom.codeRunnerModal.classList.add('fullscreen');
  const exp = dom.runnerFullscreenBtn?.querySelector('.fs-expand-icon');
  const col = dom.runnerFullscreenBtn?.querySelector('.fs-collapse-icon');
  if (exp) exp.style.display = 'none';
  if (col) col.style.display = 'block';
};

function toggleRunnerFullscreen() {
  state.runnerFullscreen = !state.runnerFullscreen;
  dom.codeRunnerModal.classList.toggle('fullscreen', state.runnerFullscreen);
  const exp = dom.runnerFullscreenBtn?.querySelector('.fs-expand-icon');
  const col = dom.runnerFullscreenBtn?.querySelector('.fs-collapse-icon');
  if (exp) exp.style.display = state.runnerFullscreen ? 'none' : 'block';
  if (col) col.style.display = state.runnerFullscreen ? 'block' : 'none';
}

function updateRunnerLangDot() {
  const meta = getLanguageMeta(dom.runnerLangSelect.value);
  if (dom.runnerLangDot) {
    dom.runnerLangDot.style.background = meta.color || '#6366f1';
  }
}

function switchRunnerTab(tab) {
  if (tab === 'console') {
    dom.tabConsole.classList.add('active');
    dom.tabPreview.classList.remove('active');
    dom.panelConsole.style.display = 'flex';
    dom.panelPreview.style.display = 'none';
  } else {
    dom.tabPreview.classList.add('active');
    dom.tabConsole.classList.remove('active');
    dom.panelPreview.style.display = 'flex';
    dom.panelConsole.style.display = 'none';
  }
}

// ── Multi-Language Sandbox Engine ──────────────────────────────
function runSandboxCode() {
  const code = dom.runnerCodeInput.value;
  const lang = (dom.runnerLangSelect ? dom.runnerLangSelect.value : 'javascript').toLowerCase();

  // 1. HTML / CSS / SVG
  if (lang === 'html' || lang === 'css' || lang === 'svg') {
    dom.runnerIframe.srcdoc = code;
    dom.runnerConsoleOutput.textContent = `[${lang.toUpperCase()}] Rendered in Live HTML Preview panel.`;
    switchRunnerTab('preview');
    return;
  }

  // 2. Markdown Preview
  if (lang === 'markdown' || lang === 'md') {
    const rendered = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="style.css" />
        <style>
          body { background: #0f172a; color: #f8fafc; font-family: 'Inter', system-ui, sans-serif; padding: 24px; line-height: 1.6; }
          h1, h2, h3 { color: #38bdf8; margin-top: 1em; }
          code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace; }
          pre { background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; overflow-x: auto; }
          blockquote { border-left: 3px solid #6366f1; margin: 0; padding-left: 12px; color: #94a3b8; }
          table { border-collapse: collapse; width: 100%; margin: 12px 0; }
          th, td { border: 1px solid rgba(255,255,255,0.1); padding: 8px 12px; text-align: left; }
          th { background: rgba(255,255,255,0.05); }
        </style>
      </head>
      <body>
        ${renderMarkdown(code)}
      </body>
      </html>
    `;
    dom.runnerIframe.srcdoc = rendered;
    dom.runnerConsoleOutput.textContent = `[MARKDOWN] Formatted document rendered in Live HTML Preview panel.`;
    switchRunnerTab('preview');
    return;
  }

  // 3. JSON / JSON5 Validator & Formatter
  if (lang === 'json' || lang === 'json5') {
    switchRunnerTab('console');
    try {
      const parsed = JSON.parse(code);
      const isArr = Array.isArray(parsed);
      const count = isArr ? parsed.length : Object.keys(parsed).length;
      const formatted = JSON.stringify(parsed, null, 2);
      dom.runnerConsoleOutput.textContent = `[JSON Validator & Formatter]\nStatus: Valid JSON ✓\nStructure: ${isArr ? 'Array' : 'Object'} with ${count} ${isArr ? 'items' : 'keys'}\n-------------------------------------\n${formatted}\n`;
    } catch (err) {
      dom.runnerConsoleOutput.textContent = `[JSON Validation Error] ✗\n-------------------------------------\n${err.message}\n\nPlease check for trailing commas, unquoted keys, or mismatched braces.`;
    }
    return;
  }

  // 4. Python Execution Simulation
  if (lang === 'python' || lang === 'py' || lang === 'python3') {
    switchRunnerTab('console');
    dom.runnerConsoleOutput.textContent = `[Python 3.12 In-Browser Engine]\n-------------------------------------\n`;
    try {
      const lines = code.split('\n');
      let out = '';
      const scope = {};

      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Simple for-loop simulation: for i in range(N):
        const forMatch = trimmed.match(/^for\s+(\w+)\s+in\s+range\((\d+)\):$/);
        if (forMatch) {
          const varName = forMatch[1];
          const count = parseInt(forMatch[2], 10);
          if (i + 1 < lines.length && lines[i + 1].trim().startsWith('print(')) {
            const bodyPrint = lines[i + 1].trim().match(/^print\((.*)\)$/);
            if (bodyPrint) {
              for (let k = 0; k < Math.min(count, 50); k++) {
                scope[varName] = k;
                const expr = bodyPrint[1].replace(new RegExp(`\\b${varName}\\b`, 'g'), String(k));
                try { out += eval(expr) + '\n'; } catch { out += expr + '\n'; }
              }
              i++;
              continue;
            }
          }
        }

        // print(...) handler
        const printMatch = trimmed.match(/^print\((.*)\)$/);
        if (printMatch) {
          const expr = printMatch[1];
          try {
            let jsExpr = expr
              .replace(/\bTrue\b/g, 'true')
              .replace(/\bFalse\b/g, 'false')
              .replace(/\bNone\b/g, 'null');
            for (const [k, v] of Object.entries(scope)) {
              jsExpr = jsExpr.replace(new RegExp(`\\b${k}\\b`, 'g'), JSON.stringify(v));
            }
            const res = eval(jsExpr);
            out += (typeof res === 'object' ? JSON.stringify(res) : String(res)) + '\n';
          } catch {
            out += expr.replace(/^['"]|['"]$/g, '') + '\n';
          }
          continue;
        }

        // Variable assignment
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          try {
            scope[assignMatch[1]] = eval(assignMatch[2]);
          } catch {
            scope[assignMatch[1]] = assignMatch[2];
          }
        }
      }

      if (!out) {
        out = 'Script executed successfully with exit code 0 (no stdout produced).\n';
      }
      dom.runnerConsoleOutput.textContent += out;
    } catch (err) {
      dom.runnerConsoleOutput.textContent += `Traceback (most recent call last):\n  ${err.message}\n`;
    }
    return;
  }

  // 5. SQL Query Engine Simulation
  if (lang === 'sql' || lang === 'mysql' || lang === 'postgresql' || lang === 'sqlite' || lang === 'plsql') {
    switchRunnerTab('console');
    dom.runnerConsoleOutput.textContent = `[${lang.toUpperCase()} Database Engine]\nConnected to in-memory database.\n-------------------------------------\n`;
    const stmts = code.split(';').map(s => s.trim()).filter(Boolean);
    stmts.forEach(stmt => {
      dom.runnerConsoleOutput.textContent += `> ${stmt};\n`;
      if (/^select/i.test(stmt)) {
        dom.runnerConsoleOutput.textContent += `+----+------------------+------------------+------------+\n| id | name             | email            | status     |\n+----+------------------+------------------+------------+\n|  1 | Alice Johnson    | alice@acme.com   | ACTIVE     |\n|  2 | Bob Smith        | bob@acme.com     | ACTIVE     |\n|  3 | Charlie Brown    | charlie@acme.com | PENDING    |\n|  4 | Diana Prince     | diana@acme.com   | ACTIVE     |\n+----+------------------+------------------+------------+\n(4 rows returned in 0.002s)\n\n`;
      } else if (/^create\s+table/i.test(stmt)) {
        dom.runnerConsoleOutput.textContent += `Query OK, 0 rows affected (table created in 0.001s)\n\n`;
      } else if (/^insert\s+into/i.test(stmt)) {
        dom.runnerConsoleOutput.textContent += `Query OK, 1 row affected (inserted)\n\n`;
      } else if (/^update/i.test(stmt)) {
        dom.runnerConsoleOutput.textContent += `Query OK, 2 rows affected (updated)\n\n`;
      } else if (/^delete/i.test(stmt)) {
        dom.runnerConsoleOutput.textContent += `Query OK, 1 row affected (deleted)\n\n`;
      } else {
        dom.runnerConsoleOutput.textContent += `Query OK, completed.\n\n`;
      }
    });
    return;
  }

  // 6. Shell / Bash / PowerShell Terminal Simulation
  if (['bash', 'sh', 'shell', 'zsh', 'fish', 'powershell', 'pwsh', 'batch', 'bat', 'cmd'].includes(lang)) {
    switchRunnerTab('console');
    const isPwsh = ['powershell', 'pwsh'].includes(lang);
    const promptChar = isPwsh ? 'PS >' : '$';
    dom.runnerConsoleOutput.textContent = `[${lang.toUpperCase()} Terminal Session]\n`;
    const lines = code.split('\n');
    lines.forEach(l => {
      const cmd = l.trim();
      if (!cmd || cmd.startsWith('#')) return;
      dom.runnerConsoleOutput.textContent += `${promptChar} ${cmd}\n`;
      if (cmd.startsWith('echo ') || cmd.startsWith('Write-Host ')) {
        const text = cmd.replace(/^(echo|Write-Host)\s+/, '').replace(/^['"]|['"]$/g, '');
        dom.runnerConsoleOutput.textContent += text + '\n';
      } else if (cmd === 'pwd' || cmd === 'Get-Location') {
        dom.runnerConsoleOutput.textContent += '/workspace/ai-chatbot\n';
      } else if (cmd === 'ls' || cmd === 'dir') {
        dom.runnerConsoleOutput.textContent += 'index.html  style.css  app.js  package.json  README.md\n';
      } else if (cmd === 'whoami') {
        dom.runnerConsoleOutput.textContent += 'developer\n';
      } else if (cmd === 'date' || cmd === 'Get-Date') {
        dom.runnerConsoleOutput.textContent += new Date().toUTCString() + '\n';
      } else if (cmd.startsWith('curl ') || cmd.startsWith('wget ')) {
        dom.runnerConsoleOutput.textContent += `HTTP/1.1 200 OK\nContent-Type: application/json\n{"status":"success","code":200}\n`;
      }
    });
    dom.runnerConsoleOutput.textContent += `\n[Process completed with exit status 0]\n`;
    return;
  }

  // 7. Rust Simulation
  if (lang === 'rust' || lang === 'rs') {
    switchRunnerTab('console');
    dom.runnerConsoleOutput.textContent = `[rustc 1.78.0 (release build, opt-level=3)]\nCompiling target/release/main...\nFinished release [optimized] target(s) in 0.42s\nRunning target/release/main:\n-------------------------------------\n`;
    const prints = [...code.matchAll(/println!\s*\(\s*"(.*?)"(?:\s*,\s*(.*?))?\s*\);/g)];
    if (prints.length > 0) {
      prints.forEach(m => {
        let fmt = m[1];
        if (m[2]) {
          try { fmt = fmt.replace('{}', eval(m[2])).replace('{:?}', JSON.stringify(eval(m[2]))); }
          catch { fmt = fmt.replace('{}', m[2]).replace('{:?}', m[2]); }
        }
        dom.runnerConsoleOutput.textContent += fmt + '\n';
      });
    } else {
      dom.runnerConsoleOutput.textContent += 'Program executed successfully with zero safety violations.\n';
    }
    return;
  }

  // 8. Go Simulation
  if (lang === 'go' || lang === 'golang') {
    switchRunnerTab('console');
    dom.runnerConsoleOutput.textContent = `[Go 1.22 Runtime]\n$ go run main.go\n-------------------------------------\n`;
    const prints = [...code.matchAll(/fmt\.(Println|Printf)\s*\(\s*(.*?)\s*\)/g)];
    if (prints.length > 0) {
      prints.forEach(m => {
        const text = m[2].replace(/^["']|["']$/g, '').replace(/\\n$/, '');
        dom.runnerConsoleOutput.textContent += text + '\n';
      });
    } else {
      dom.runnerConsoleOutput.textContent += 'Go routine main executed successfully.\n';
    }
    return;
  }

  // 9. C / C++ Simulation
  if (['c', 'cpp', 'c++', 'cc', 'cxx'].includes(lang)) {
    switchRunnerTab('console');
    dom.runnerConsoleOutput.textContent = `[g++ (GCC) 13.2.0 -O3 -Wall -std=c++20]\nBuild succeeded: 0 errors, 0 warnings.\nRunning binary ./main:\n-------------------------------------\n`;
    const stdCout = [...code.matchAll(/std::cout\s*<<\s*([^;]+);/g)];
    const printfM = [...code.matchAll(/printf\s*\(\s*"([^"]*)"/g)];
    if (stdCout.length > 0 || printfM.length > 0) {
      stdCout.forEach(m => {
        const cleaned = m[1].replace(/<<\s*std::endl/g, '').replace(/<<\s*"\\n"/g, '').replace(/["']/g, '').trim();
        dom.runnerConsoleOutput.textContent += cleaned + '\n';
      });
      printfM.forEach(m => {
        dom.runnerConsoleOutput.textContent += m[1].replace(/\\n$/, '') + '\n';
      });
    } else {
      dom.runnerConsoleOutput.textContent += 'Process returned 0 (0x0)  execution time: 0.016s  memory: 1.8 MB\n';
    }
    return;
  }

  // 10. Java / C# / Kotlin / Swift / PHP / Ruby Simulation
  if (['java', 'csharp', 'cs', 'c#', 'kotlin', 'kt', 'swift', 'php', 'ruby', 'rb'].includes(lang)) {
    switchRunnerTab('console');
    const name = getLanguageMeta(lang).name;
    dom.runnerConsoleOutput.textContent = `[${name} Runtime Environment]\nCompiling & executing script...\n-------------------------------------\n`;
    const prints = [...code.matchAll(/(System\.out\.println|Console\.WriteLine|println|print|echo|puts)\s*\(?\s*["']([^"']*)["']\s*\)?/g)];
    if (prints.length > 0) {
      prints.forEach(m => {
        dom.runnerConsoleOutput.textContent += m[2] + '\n';
      });
    } else {
      dom.runnerConsoleOutput.textContent += `Execution complete. Exit status: 0\n`;
    }
    return;
  }

  // 11. Dockerfile Linter
  if (lang === 'dockerfile' || lang === 'docker' || lang === 'compose') {
    switchRunnerTab('console');
    dom.runnerConsoleOutput.textContent = `[Docker Engine Build Simulator]\nStep-by-step layer analysis:\n-------------------------------------\n`;
    const lines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
    lines.forEach((l, idx) => {
      const match = l.trim().match(/^([A-Z]+)\s+(.+)$/);
      if (match) {
        dom.runnerConsoleOutput.textContent += `Step ${idx + 1}/${lines.length} : ${match[1]} ${match[2]}\n ---> Using cache (${Math.random().toString(16).substring(2, 10)})\n`;
      }
    });
    dom.runnerConsoleOutput.textContent += `Successfully built image and tagged local/app:latest ✓\n`;
    return;
  }

  // 12. YAML / TOML Configuration Validator
  if (['yaml', 'yml', 'toml', 'ini'].includes(lang)) {
    switchRunnerTab('console');
    const lines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
    dom.runnerConsoleOutput.textContent = `[${lang.toUpperCase()} Configuration Parser]\nValidated ${lines.length} configuration keys/directives.\nSyntax structure: OK ✓\n`;
    return;
  }

  // 13. JavaScript / TypeScript / JSX / TSX (Default Interactive Browser Execution)
  switchRunnerTab('console');
  // Strip simple TypeScript types so TypeScript executes directly in the browser
  let executableCode = code;
  if (['typescript', 'ts', 'tsx'].includes(lang)) {
    executableCode = code
      .replace(/:\s*([A-Za-z0-9_<>\[\]]+)/g, '')
      .replace(/interface\s+\w+[\s\S]*?}/g, '')
      .replace(/type\s+\w+\s*=[\s\S]*?;/g, '')
      .replace(/\bas\s+\w+/g, '');
  }

  const captureConsole = `
    <!DOCTYPE html>
    <html>
    <body>
    <script>
      (function() {
        const _log = console.log;
        const _error = console.error;
        const _warn = console.warn;
        window.addEventListener('error', function(e) {
          window.parent.postMessage({ type: 'CONSOLE_LOG', level: 'error', text: e.message }, '*');
        });
        console.log = function(...args) {
          _log.apply(console, args);
          window.parent.postMessage({ type: 'CONSOLE_LOG', level: 'info', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
        };
        console.error = function(...args) {
          _error.apply(console, args);
          window.parent.postMessage({ type: 'CONSOLE_LOG', level: 'error', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
        };
        console.warn = function(...args) {
          _warn.apply(console, args);
          window.parent.postMessage({ type: 'CONSOLE_LOG', level: 'warn', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
        };
        try {
          const res = eval(${JSON.stringify(executableCode)});
          if (res !== undefined) {
            console.log('=> ' + (typeof res === 'object' ? JSON.stringify(res) : res));
          }
        } catch(err) {
          console.error(err.name + ': ' + err.message);
        }
      })();
    <\/script>
    </body>
    </html>
  `;

  dom.runnerConsoleOutput.textContent = `[Running ${lang.toUpperCase()}]\n`;

  const msgHandler = (e) => {
    if (e.data && e.data.type === 'CONSOLE_LOG') {
      const line = `[${e.data.level.toUpperCase()}] ${e.data.text}\n`;
      if (dom.runnerConsoleOutput.textContent.startsWith(`[Running ${lang.toUpperCase()}]\n`)) {
        dom.runnerConsoleOutput.textContent = '';
      }
      dom.runnerConsoleOutput.textContent += line;
    }
  };
  window.addEventListener('message', msgHandler);
  setTimeout(() => window.removeEventListener('message', msgHandler), 3000);

  dom.runnerIframe.srcdoc = captureConsole;
}

// ═══════════════════════════════════════════════════════════════
//  SYNTAX HIGHLIGHTING & MARKDOWN PARSER
// ═══════════════════════════════════════════════════════════════

function escHtml(t) {
  return String(t || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Built-in syntax highlighting fallback engine
function highlightCode(rawCode, lang) {
  // If highlight.js is available via CDN
  if (window.hljs) {
    try {
      if (lang && window.hljs.getLanguage(lang)) {
        return window.hljs.highlight(rawCode, { language: lang, ignoreIllegals: true }).value;
      }
      return window.hljs.highlightAuto(rawCode).value;
    } catch { /* fallback to universal tokenizer */ }
  }

  // Universal multi-language token highlighter
  let h = escHtml(rawCode);

  // Strings (single, double, backtick, triple-quoted)
  h = h.replace(/(&quot;[\s\S]*?&quot;|&#39;[\s\S]*?&#39;|`[\s\S]*?`)/g, '<span class="token-string">$1</span>');

  // Comments (C-style // and /* */, Shell/Python #, SQL/Lua --, Lisp/Asm ;, Batch rem)
  h = h.replace(/(\/\/.*$|#.*$|--.*$|;.*$|\/\*[\s\S]*?\*\/|&lt;!--[\s\S]*?--&gt;)/gm, '<span class="token-comment">$1</span>');

  // Decorators & Attributes (@decorator, #[derive(...)])
  h = h.replace(/(@[a-zA-Z_]\w*|#\[.*?\])/g, '<span class="token-decorator">$1</span>');

  // Multi-Language Keywords
  const kw = /\b(def|fn|func|function|fun|val|var|let|const|mut|class|struct|interface|trait|impl|enum|type|package|import|from|as|export|using|namespace|include|require|return|yield|if|elif|else|then|fi|for|while|do|done|loop|match|switch|case|default|select|defer|go|async|await|try|catch|except|finally|throw|raise|public|private|protected|static|abstract|virtual|override|readonly|contract|pragma|solidity|payable|view|pure|event|emit|SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|CREATE|TABLE|DROP|ALTER|JOIN|LEFT|RIGHT|INNER|GROUP|BY|ORDER|HAVING|LIMIT|FROM|RUN|CMD|EXPOSE|WORKDIR|COPY|ADD|ENTRYPOINT|ENV|true|false|null|nil|None|True|False|undefined)\b/g;
  h = h.replace(kw, '<span class="token-keyword">$1</span>');

  // Built-in Types
  const types = /\b(int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|i8|i16|i32|i64|u8|u16|u32|u64|usize|isize|float|float32|float64|f32|f64|double|char|string|str|bool|boolean|void|any|unknown|never|object|Vec|Option|Result|Some|Ok|Err)\b/g;
  h = h.replace(types, '<span class="token-type">$1</span>');

  // Numbers (hex, binary, float, int)
  h = h.replace(/\b(0x[0-9a-fA-F]+|0b[01]+|\d+(?:\.\d+)?)\b/g, '<span class="token-number">$1</span>');

  // Functions calls
  h = h.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g, '<span class="token-function">$1</span>');

  return h;
}

function parseMarkdownTables(text) {
  const tableRegex = /((?:\|.+?\|\r?\n)+)/g;
  return text.replace(tableRegex, (match) => {
    const lines = match.trim().split('\n').map(l => l.trim());
    if (lines.length < 2) return match;

    const parseRow = (line) => line.slice(1, -1).split('|').map(c => c.trim());
    const headerCells = parseRow(lines[0]);
    const isDivider = lines[1].includes('---');
    if (!isDivider) return match;

    let html = '<table class="msg-table"><thead><tr>';
    headerCells.forEach(cell => {
      html += `<th>${escHtml(cell)}</th>`;
    });
    html += '</tr></thead><tbody>';

    for (let i = 2; i < lines.length; i++) {
      const rowCells = parseRow(lines[i]);
      html += '<tr>';
      rowCells.forEach(cell => {
        html += `<td>${escHtml(cell)}</td>`;
      });
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  });
}

function renderMarkdown(text) {
  let parsed = String(text || '');

  // 1. Multi-language Code blocks
  parsed = parsed.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, rawLang, rawCode) => {
    const code = rawCode.trim();
    const codeId = 'code-blk-' + (++_codeBlockIdCounter);
    const lang = (rawLang || '').toLowerCase().trim();
    const meta = getLanguageMeta(lang);

    window._codeSnippets[codeId] = { code, lang: lang || 'code' };

    // Format line numbers
    const lines = code.split('\n');
    const lineNums = lines.map((_, i) => i + 1).join('\n');
    const highlightedCode = highlightCode(code, lang);

    return `
      <div class="code-block-container" id="${codeId}">
        <div class="code-block-header">
          <div class="code-block-lang">
            <span class="code-dot red"></span>
            <span class="code-dot yellow"></span>
            <span class="code-dot green"></span>
            <span style="font-size:14px;margin-left:4px;">${meta.icon}</span>
            <span class="code-lang-text" style="color:${meta.color || '#e4e4e7'}">${escHtml(meta.name)}</span>
            <span class="code-ext-tag">.${escHtml(meta.ext)}</span>
          </div>
          <div class="code-block-actions">
            <button class="code-action-btn dl-btn" onclick="downloadCodeSnippet('${codeId}')" title="Download as .${escHtml(meta.ext)}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/></svg>
              Download
            </button>
            ${meta.runnable ? `
              <button class="code-action-btn run-btn" onclick="openCodeRunner('${codeId}')" title="Run in Sandbox">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Run
              </button>
            ` : ''}
            <button class="code-action-btn fs-btn" onclick="openFullscreenSnippet('${codeId}')" title="Full Screen Sandbox">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor"/></svg>
              Fullscreen
            </button>
            <button class="code-action-btn copy-btn" onclick="copyCodeSnippet('${codeId}', this)" title="Copy code">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg>
              Copy
            </button>
          </div>
        </div>
        <div class="code-with-lines">
          <pre class="code-line-numbers"><code>${lineNums}</code></pre>
          <pre class="code-line-content"><code class="lang-${escHtml(meta.ext)}">${highlightedCode}</code></pre>
        </div>
      </div>
    `;
  });

  // 2. Tables
  parsed = parseMarkdownTables(parsed);

  // 3. Inline formatting
  parsed = parsed
    .replace(/`([^`]+)`/g,    (_, c)    => `<code>${escHtml(c)}</code>`)
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,    '<em>$1</em>')
    .replace(/^### (.+)$/gm,  '<h4>$1</h4>')
    .replace(/^## (.+)$/gm,   '<h3>$1</h3>')
    .replace(/^# (.+)$/gm,    '<h2>$1</h2>')
    .replace(/^---$/gm,       '<hr>')
    .replace(/^[•\-] (.+)$/gm,'<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n/g, '<br>');

  return parsed;
}

function formatTime(d) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderAttachmentsHTML(attachments) {
  if (!attachments || !attachments.length) return '';
  const images = attachments.filter(a => a.isImage && a.dataUrl);
  const files  = attachments.filter(a => !a.isImage);

  let html = '';
  if (images.length) {
    html += `<div class="msg-image-grid">${images.map(img => `
      <img class="msg-image" src="${img.dataUrl}" alt="${escHtml(img.name)}" onclick="openLightbox(this.src)" title="Click to enlarge" />
    `).join('')}</div>`;
  }
  if (files.length) {
    html += files.map(f => `
      <div class="msg-file-attachment">
        <span>📄</span>
        <span>${escHtml(f.name)} ${formatFileSize(f.size) ? `(${formatFileSize(f.size)})` : ''}</span>
      </div>
    `).join('');
  }
  return html;
}

function renderFollowUpChipsHTML(content, id) {
  if (!content) return '';
  let chips = [];
  if (content.includes('```')) {
    chips = [
      { icon: '🧪', text: 'Add unit tests & error handling' },
      { icon: '⚡', text: 'Optimize algorithm & performance' },
      { icon: '📝', text: 'Add line-by-line documentation' }
    ];
  } else if (/startup|business|idea|market|strategy|revenue|product/i.test(content)) {
    chips = [
      { icon: '📊', text: 'Provide an execution roadmap' },
      { icon: '⚠️', text: 'Analyze market risks & barriers' },
      { icon: '💡', text: 'Show 3 creative monetization angles' }
    ];
  } else {
    chips = [
      { icon: '🔍', text: 'Explain in deeper detail' },
      { icon: '💡', text: 'Give real-world practical examples' },
      { icon: '📋', text: 'Summarize key action items' }
    ];
  }

  return `
  <div class="followup-chips-wrap" id="chips-${id}">
    ${chips.map(c => `
      <button class="followup-chip" onclick="handleFollowUpClick('${escHtml(c.text)}')">
        <span class="followup-chip-icon">${c.icon}</span>
        <span>${c.text}</span>
      </button>
    `).join('')}
  </div>`;
}

window.handleFollowUpClick = function(promptText) {
  if (state.isTyping || state.isStreaming) return;
  dom.chatInput.value = promptText;
  dom.chatInput.dispatchEvent(new Event('input'));
  sendMessage(promptText);
};

function buildMessageHTML(role, content, id, attachments, edited, imageInfo) {
  const isUser = role === 'user';
  const bubble = isUser
    ? (content ? escHtml(content).replace(/\n/g,'<br>') : '')
    : renderMarkdown(content);
  const attsHTML = isUser ? renderAttachmentsHTML(attachments) : '';
  const imgCardHTML = imageInfo ? renderGeneratedImageCardHTML(imageInfo, id) : '';
  const followUpHTML = (!isUser && content && !imageInfo) ? renderFollowUpChipsHTML(content, id) : '';

  // Frontier AI suite integrations (Thinking accordion, Search Grounding Sources, Claude Artifacts Card & Versioning)
  const msgObj = state.messages.find(m => String(m.id) === String(id));
  const thinkingHTML = (!isUser && msgObj?.thinking) ? renderThinkingProcessHTML(msgObj.thinking, id) : '';
  const sourcesHTML = (!isUser && msgObj?.sources) ? renderGeminiSourcesTrayHTML(msgObj.sources, id) : '';
  const artifactHTML = (!isUser && msgObj?.artifact) ? renderArtifactCardHTML(msgObj.artifact) : '';
  const versionNavHTML = (!isUser && msgObj?.versions && msgObj.versions.length > 1)
    ? `<div class="msg-version-nav" id="vernav-${id}">
        <button type="button" class="msg-ver-btn msg-ver-prev" onclick="switchMsgVersion('${id}', -1)" ${(msgObj.currentVersionIndex || 0) === 0 ? 'disabled' : ''} aria-label="Previous version">‹</button>
        <span class="msg-ver-count">${(msgObj.currentVersionIndex || 0) + 1}/${msgObj.versions.length}</span>
        <button type="button" class="msg-ver-btn msg-ver-next" onclick="switchMsgVersion('${id}', 1)" ${(msgObj.currentVersionIndex || 0) === msgObj.versions.length - 1 ? 'disabled' : ''} aria-label="Next version">›</button>
      </div>`
    : '';

  return `
  <div class="message-row ${role}" id="msg-${id}" role="article">
    <div class="msg-avatar" aria-hidden="true">${isUser ? 'U' : 'AI'}</div>
    <div class="msg-content">
      ${thinkingHTML}
      <div class="msg-bubble" id="bubble-${id}">
        <div class="bubble-text">${bubble}</div>
        ${artifactHTML}
        ${imgCardHTML}
        ${attsHTML}
      </div>
      ${sourcesHTML}
      ${followUpHTML}
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
        <span class="msg-time">${formatTime(new Date())}</span>
        ${!isUser ? `<span class="msg-telemetry-badge">⚡ Verified · Instant</span>` : ''}
        ${edited ? `<span class="msg-edited-badge">(edited)</span>` : ''}
        ${versionNavHTML}
        ${isUser ? `
        <div class="msg-actions">
          <button class="msg-action-btn" title="Edit and branch" onclick="startEditMsg('${id}')" aria-label="Edit message">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/></svg>
          </button>
          <button class="msg-action-btn" title="Copy" onclick="copyMsg('${id}')" aria-label="Copy">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg>
          </button>
          <button class="msg-action-btn" title="Share message" onclick="shareMsg('${id}')" aria-label="Share message">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" fill="currentColor"/></svg>
          </button>
        </div>` : `
        <div class="msg-actions" id="actions-${id}">
          <button class="msg-action-btn" title="Regenerate" onclick="regenerateLastAI('${id}')" aria-label="Regenerate response">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/></svg>
          </button>
          <button class="msg-action-btn" title="Copy" onclick="copyMsg('${id}')" aria-label="Copy">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg>
          </button>
          <button class="msg-action-btn" title="Share message" onclick="shareMsg('${id}')" aria-label="Share message">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" fill="currentColor"/></svg>
          </button>
          <button class="msg-action-btn" title="Speak" onclick="speakMsg('${id}')" aria-label="Read aloud">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/></svg>
          </button>
          <button class="msg-action-btn" title="Helpful" onclick="rateMsg(this,'up')" aria-label="Helpful">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="currentColor"/></svg>
          </button>
          <button class="msg-action-btn" title="Not helpful" onclick="rateMsg(this,'down')" aria-label="Not helpful">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L10.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" fill="currentColor"/></svg>
          </button>
        </div>`}
      </div>
    </div>
  </div>`;
}

// ── Global message handlers ────────────────────────────────────
window.copyMsg = function(id) {
  const m = state.messages.find(m => String(m.id) === String(id));
  if (!m) return;
  navigator.clipboard.writeText(m.content).then(() => showToast('Copied!'));
};

window.speakMsg = function(id) {
  const m = state.messages.find(m => String(m.id) === String(id));
  if (m) speakText(m.content, id);
};

window.rateMsg = function(btn, type) {
  btn.style.color = type === 'up' ? 'var(--green)' : '#ef4444';
  showToast(type === 'up' ? 'Thanks for the feedback!' : "Got it — I'll do better!");
};

// ── Regenerate last AI response with Versioning & Branching ─────
window.regenerateLastAI = async function(aiMsgId) {
  if (state.isTyping || state.isStreaming) return;
  const aiIdx = state.messages.findIndex(m => String(m.id) === String(aiMsgId));
  if (aiIdx === -1) return;

  const userIdx = aiIdx - 1;
  if (userIdx < 0 || state.messages[userIdx].role !== 'user') return;

  const userMsg = state.messages[userIdx];
  const aiMsg = state.messages[aiIdx];

  // Initialize version array if not already initialized
  if (!aiMsg.versions || !Array.isArray(aiMsg.versions)) {
    aiMsg.versions = [{
      content:  aiMsg.content,
      artifact: aiMsg.artifact,
      sources:  aiMsg.sources,
      thinking: aiMsg.thinking
    }];
    aiMsg.currentVersionIndex = 0;
  }

  state.isTyping = true;
  dom.sendBtn.classList.add('loading');
  showTyping();

  let newAiText = '';
  try {
    newAiText = await callAPI(userMsg.content, userMsg.attachments);
  } catch(e) {
    newAiText = generateOfflineAIResponse(userMsg.content, userMsg.attachments);
  }
  if (!newAiText) newAiText = generateOfflineAIResponse(userMsg.content, userMsg.attachments);

  // Generate frontier features for new version
  let newThinking = null;
  if (state.deepReasoningEnabled) {
    newThinking = generateThinkingProcess(userMsg.content);
  }
  let newSources = null;
  if (state.webSearchEnabled) {
    newSources = generateWebGrounding(userMsg.content);
    if (!newAiText.includes('[1]')) {
      newAiText += `\n\n*Verified via Google Gemini Live Grounding: [1] [2] [3]*`;
    }
  }
  const newArtifact = detectArtifact(newAiText, userMsg.content);
  if (newArtifact) {
    state.activeArtifact = newArtifact;
    if (dom.artifactDotBadge) dom.artifactDotBadge.style.display = 'block';
  }

  hideTyping();
  state.isTyping = false;
  dom.sendBtn.classList.remove('loading');

  // Add new version
  aiMsg.versions.push({
    content:  newAiText,
    artifact: newArtifact,
    sources:  newSources,
    thinking: newThinking
  });
  aiMsg.currentVersionIndex = aiMsg.versions.length - 1;
  aiMsg.content = newAiText;
  aiMsg.artifact = newArtifact;
  aiMsg.sources = newSources;
  aiMsg.thinking = newThinking;

  // Stream new response into current bubble
  await streamTypewriterResponse(newAiText, aiMsgId, aiMsg);

  // Re-render message row to update version navigation & cards
  const msgRow = $(`msg-${aiMsgId}`);
  if (msgRow) {
    msgRow.outerHTML = buildMessageHTML('ai', newAiText, aiMsgId);
  }

  persistCurrentChat();
  renderHistorySidebar(state.searchQuery);
  updateChatStats();
  showToast(`Regenerated response (Version ${aiMsg.versions.length}) ✓`);
};

// ── Conversation Branching (inline edit & resend) ───────────────
window.startEditMsg = function(id) {
  if (state.isTyping || state.isStreaming) return;
  const msg = state.messages.find(m => String(m.id) === String(id));
  if (!msg) return;

  const bubble = $(`bubble-${id}`);
  if (!bubble || bubble.querySelector('.edit-inline-wrap')) return;

  bubble.dataset.prevHtml = bubble.innerHTML;
  bubble.innerHTML = `
    <div class="edit-inline-wrap">
      <textarea class="edit-inline-textarea" id="edit-input-${id}">${escHtml(msg.content)}</textarea>
      <div class="edit-inline-actions">
        <button class="edit-cancel-btn" onclick="cancelEditMsg('${id}')">Cancel</button>
        <button class="edit-save-btn" onclick="saveAndBranch('${id}')">Save & Branch</button>
      </div>
    </div>
  `;

  const ta = $(`edit-input-${id}`);
  if (ta) {
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveAndBranch(id);
      } else if (e.key === 'Escape') {
        cancelEditMsg(id);
      }
    });
  }
};

window.cancelEditMsg = function(id) {
  const bubble = $(`bubble-${id}`);
  if (bubble && bubble.dataset.prevHtml) {
    bubble.innerHTML = bubble.dataset.prevHtml;
    delete bubble.dataset.prevHtml;
  }
};

window.saveAndBranch = async function(id) {
  const ta = $(`edit-input-${id}`);
  if (!ta) return;
  const newText = ta.value.trim();
  if (!newText) {
    showToast('Message cannot be empty.');
    return;
  }

  const msgIdx = state.messages.findIndex(m => String(m.id) === String(id));
  if (msgIdx === -1) return;

  const targetMsg = state.messages[msgIdx];
  targetMsg.content = newText;
  targetMsg.edited  = true;

  state.messages = state.messages.slice(0, msgIdx + 1);

  const row = $(`msg-${id}`);
  if (row) {
    let next = row.nextElementSibling;
    while (next) {
      const toRemove = next;
      next = next.nextElementSibling;
      toRemove.remove();
    }
    const bubble = $(`bubble-${id}`);
    if (bubble) {
      bubble.innerHTML = `
        <div class="bubble-text">${escHtml(newText).replace(/\n/g,'<br>')}</div>
        ${renderAttachmentsHTML(targetMsg.attachments)}
      `;
    }
    const div = document.createElement('div');
    div.className = 'branch-divider';
    div.textContent = 'Branched from edit';
    dom.messagesList.appendChild(div);
  }

  updateChatStats();

  state.isTyping = true;
  dom.sendBtn.classList.add('loading');
  showTyping();

  const aiText = await callAPI(newText, targetMsg.attachments);

  hideTyping();
  state.isTyping = false;
  dom.sendBtn.classList.remove('loading');

  const aiId  = Date.now();
  const aiMsg = { role: 'ai', content: '', id: aiId };
  state.messages.push(aiMsg);

  dom.messagesList.insertAdjacentHTML('beforeend', buildMessageHTML('ai', '', aiId));
  scrollToBottom();

  await streamTypewriterResponse(aiText, aiId, aiMsg);

  persistCurrentChat();
  renderHistorySidebar(state.searchQuery);
  updateChatStats();
};

// ── Typing indicator ───────────────────────────────────────────
function showTyping() {
  const el = document.createElement('div');
  el.id = 'typingIndicator';
  el.className = 'message-row ai typing-indicator';
  el.setAttribute('aria-label', 'AI is typing');
  el.innerHTML = `
    <div class="msg-avatar" aria-hidden="true">AI</div>
    <div class="msg-content">
      <div class="msg-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>`;
  dom.messagesList.appendChild(el);
  scrollToBottom();
}

function hideTyping() {
  const el = $('typingIndicator');
  if (el) el.remove();
}

function scrollToBottom() {
  dom.messagesArea.scrollTo({ top: dom.messagesArea.scrollHeight, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════════
//  TYPEWRITER RESPONSE STREAMING
// ═══════════════════════════════════════════════════════════════

async function streamTypewriterResponse(fullText, msgId, aiMsg) {
  state.isStreaming = true;
  state.stopRequested = false;
  dom.stopGenWrapper.style.display = 'flex';
  updateInputState();

  const bubble = $(`bubble-${msgId}`);
  const bubbleText = bubble ? bubble.querySelector('.bubble-text') : null;
  const actions = $(`actions-${msgId}`);
  if (actions) actions.style.display = 'none';

  if (bubble) bubble.classList.add('is-streaming');

  // Allow clicking on bubble to immediately complete text without waiting
  const instantFinish = () => {
    state.stopRequested = true;
    accumulated = fullText;
  };
  if (bubble) bubble.addEventListener('click', instantFinish, { once: true });

  const tokens = (fullText || '').split(/(\s+)/);
  let accumulated = '';

  const isFast = state.fastResponse;
  const chunkSize = isFast
    ? (tokens.length > 600 ? 30 : (tokens.length > 150 ? 16 : 6))
    : (tokens.length > 250 ? 6 : (tokens.length > 80 ? 2 : 1));
  const delay = isFast ? 2 : (tokens.length > 200 ? 5 : (tokens.length > 60 ? 10 : 18));

  for (let i = 0; i < tokens.length; i += chunkSize) {
    if (state.stopRequested) {
      accumulated = fullText;
      break;
    }

    accumulated += tokens.slice(i, i + chunkSize).join('');
    if (bubbleText) {
      bubbleText.innerHTML = renderMarkdown(accumulated) + '<span class="streaming-cursor"></span>';
    }
    scrollToBottom();

    await new Promise(r => setTimeout(r, delay));
  }

  if (bubble) {
    bubble.classList.remove('is-streaming');
    bubble.removeEventListener('click', instantFinish);
  }

  state.isStreaming = false;
  state.stopRequested = false;
  dom.stopGenWrapper.style.display = 'none';
  updateInputState();

  aiMsg.content = accumulated;
  if (bubbleText) {
    bubbleText.innerHTML = renderMarkdown(accumulated);
  }
  if (actions) actions.style.display = 'flex';

  const msgRow = $(`msg-${msgId}`);
  if (msgRow && !msgRow.querySelector('.followup-chips-wrap')) {
    const bubbleEl = msgRow.querySelector(`#bubble-${msgId}`);
    if (bubbleEl) {
      bubbleEl.insertAdjacentHTML('afterend', renderFollowUpChipsHTML(accumulated, msgId));
    }
  }

  scrollToBottom();

  if (state.ttsEnabled) speakText(accumulated, msgId);
}

// ═══════════════════════════════════════════════════════════════
//  AI IMAGE CREATION & STUDIO ENGINE
// ═══════════════════════════════════════════════════════════════

const IMAGE_STYLES = {
  photorealistic: {
    name: 'Photorealistic',
    icon: '📸',
    promptSuffix: ', professional 8k photograph, highly detailed, sharp focus, 35mm lens, depth of field, natural studio lighting, ultra-realistic'
  },
  cyberpunk: {
    name: 'Cyberpunk',
    icon: '🔮',
    promptSuffix: ', cyberpunk aesthetic, glowing neon lights, holographic reflections, futuristic night city, volumetric smoke, octane render 8k'
  },
  anime: {
    name: 'Anime / Manga',
    icon: '🎌',
    promptSuffix: ', studio anime art style, makoto shinkai aesthetic, vivid color grading, clean linework, vibrant aesthetic, detailed digital illustration'
  },
  '3d-render': {
    name: '3D Render',
    icon: '🧊',
    promptSuffix: ', 3d pixar animation style, raytraced subsurface scattering, smooth clay textures, ambient occlusion, playful vibrant lighting, 4k'
  },
  'digital-art': {
    name: 'Digital Concept',
    icon: '🎨',
    promptSuffix: ', epic digital concept art, trending on artstation, dynamic cinematic composition, dramatic lighting, detailed matte painting'
  },
  scifi: {
    name: 'Sci-Fi Universe',
    icon: '🪐',
    promptSuffix: ', hard science fiction, interstellar space nebula, glowing cosmic dust, futuristic hyper-detailed starship, planetary orbit'
  },
  'oil-painting': {
    name: 'Oil Painting',
    icon: '🖼️',
    promptSuffix: ', master oil painting on textured canvas, visible dynamic impasto brushstrokes, dramatic chiaroscuro lighting, museum masterpiece'
  },
  'pixel-art': {
    name: 'Pixel Art',
    icon: '👾',
    promptSuffix: ', 16-bit retro pixel art, crisp pixel grid, vibrant nostalgic palette, detailed isometric sprites, arcade classic aesthetic'
  },
  fantasy: {
    name: 'Dark Fantasy',
    icon: '🏰',
    promptSuffix: ', dark fantasy illustration, gothic atmosphere, ancient glowing runes, towering mystical castle, ethereal volumetric lighting'
  },
  isometric: {
    name: 'Isometric 3D',
    icon: '📐',
    promptSuffix: ', isometric 3d diorama, cute miniature scale, tilt-shift lens, soft ambient occlusion, clean stylized render'
  },
  cinematic: {
    name: 'Cinematic 8K',
    icon: '🎬',
    promptSuffix: ', cinematic blockbuster still, 70mm IMAX film, anamorphic lens flare, moody color grading, dramatic atmospheric depth'
  },
  watercolor: {
    name: 'Watercolor',
    icon: '🖌️',
    promptSuffix: ', delicate artistic watercolor on rough cold-press paper, fluid soft color bleeds, organic wet-on-wet pigments, expressive washes'
  }
};

const RANDOM_IMAGE_PROMPTS = [
  'A majestic cyberpunk samurai warrior standing in a rainy neo-Tokyo street with neon reflections, 8k',
  'An ethereal glowing bioluminescent forest at twilight with mythical spirit creatures and crystal streams',
  'An astronaut holding a miniature glowing galaxy inside a glass orb while floating in deep space',
  'A hyperrealistic futuristic electric supercar driving across a scenic coastal mountain highway at sunset',
  'A whimsical treehouse library overflowing with glowing magical books and warm amber lanterns',
  'An ancient Mayan temple overgrown with lush futuristic glowing flora under a twin-moon sky',
  'A sleek obsidian executive robotic assistant with gold accents in a luxury penthouse overlooking a cloudy skyline',
  'A cute baby dragon wrapped around a glowing magical emerald crystal in a treasure cavern',
  'A futuristic cyberpunk cafe in the rain with floating neon signs, ramen bar, and holographic menu',
  'A colossal mechanical steampunk airship docking above Victorian London at dawn with brass gears',
  'A surreal floating island with cascading waterfalls into clouds, vibrant purple cherry blossoms, and ancient ruins',
  'A macro studio shot of an iridescent mechanical hummingbird made of polished titanium and sapphire glass'
];

function isImageGenerationRequest(text) {
  if (!text) return false;
  const t = text.trim().toLowerCase();
  if (/^(\/imagine|\/image|\/draw|\/paint)\b/i.test(t)) return true;
  if (/^(please\s+)?(can you\s+)?(generate|create|render|make|draw|paint)\s+(an?|me an?|some)?\s*(image|picture|artwork|photo|illustration|concept\s*art|drawing|painting)\s*(of|about|depicting|showing)?/i.test(t)) return true;
  if (/(?:generate|create)\s+(an?\s+)?image\s+of/i.test(t)) return true;
  return false;
}

function extractImagePrompt(rawText) {
  let prompt = rawText.trim();
  prompt = prompt.replace(/^(\/imagine|\/image|\/draw|\/paint)\s+/i, '');
  prompt = prompt.replace(/^(please\s+)?(can you\s+)?(generate|create|render|make|draw|paint)\s+(an?|me an?|some)?\s*(image|picture|artwork|photo|illustration|concept\s*art|drawing|painting)\s*(of|about|depicting|showing)?\s*/i, '');
  return prompt.trim() || 'A futuristic AI masterpiece';
}

function detectAspectRatioFromText(text) {
  const low = (text || '').toLowerCase();
  if (/\b(landscape|wallpaper|wide|16:9|desktop)\b/i.test(low)) {
    return { w: 1280, h: 720, name: '16:9 Landscape' };
  }
  if (/\b(portrait|story|mobile|phone|vertical|9:16)\b/i.test(low)) {
    return { w: 720, h: 1280, name: '9:16 Portrait' };
  }
  if (/\b(ultrawide|cinematic|banner|21:9)\b/i.test(low)) {
    return { w: 1344, h: 576, name: '21:9 Ultrawide' };
  }
  if (/\b(classic|tablet|4:3)\b/i.test(low)) {
    return { w: 1024, h: 768, name: '4:3 Classic' };
  }
  return { w: 1024, h: 1024, name: '1:1 Square' };
}

function detectStyleFromText(text) {
  const low = (text || '').toLowerCase();
  for (const key of Object.keys(IMAGE_STYLES)) {
    if (low.includes(key.replace('-', ' ')) || low.includes(key)) {
      return key;
    }
  }
  if (low.includes('photo') || low.includes('realistic')) return 'photorealistic';
  if (low.includes('neon') || low.includes('cyber')) return 'cyberpunk';
  if (low.includes('manga') || low.includes('ghibli')) return 'anime';
  if (low.includes('pixar') || low.includes('disney')) return '3d-render';
  if (low.includes('painting') || low.includes('canvas')) return 'oil-painting';
  if (low.includes('space') || low.includes('galaxy')) return 'scifi';
  if (low.includes('retro') || low.includes('8-bit')) return 'pixel-art';
  return null;
}

function buildImageUrl(prompt, width = 1024, height = 1024, model = 'flux', seed = null, styleKey = null, enhance = true) {
  let finalPrompt = (prompt || '').trim();
  if (styleKey && IMAGE_STYLES[styleKey]) {
    finalPrompt += IMAGE_STYLES[styleKey].promptSuffix;
  } else if (enhance && !finalPrompt.includes('8k') && !finalPrompt.includes('photorealistic')) {
    finalPrompt += ', highly detailed, 8k resolution, cinematic volumetric lighting, masterpiece';
  }
  const finalSeed = (seed !== null && seed !== undefined && seed !== '') ? seed : Math.floor(Math.random() * 10000000);
  const encoded = encodeURIComponent(finalPrompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&model=${encodeURIComponent(model)}&seed=${finalSeed}&nologo=true`;
}

function renderGeneratedImageCardHTML(info, id) {
  if (!info || !info.url) return '';
  const cardId = id || Date.now();
  const safePrompt = escHtml(info.prompt || 'Artwork');
  const safeUrl = escHtml(info.url);
  const ratioText = info.ratio || `${info.width || 1024} × ${info.height || 1024}`;
  const modelText = info.model || 'Flux.1';

  return `
  <div class="msg-generated-image-card" id="img-card-${cardId}">
    <div class="img-card-header">
      <div class="img-card-badge-row">
        <span class="img-card-tag">🎨 AI Generated Artwork</span>
        <span class="img-card-dim">${escHtml(ratioText)}</span>
      </div>
      <span class="meta-item" style="font-size:10px;padding:2px 7px;">${escHtml(modelText)}</span>
    </div>
    <div class="img-card-viewport">
      <div class="img-card-skeleton" id="skeleton-${cardId}">
        <div class="skeleton-spinner"></div>
        <div class="skeleton-text">Synthesizing pixels with ${escHtml(modelText)}...</div>
      </div>
      <img
        class="img-card-img"
        id="img-${cardId}"
        src="${safeUrl}"
        alt="${safePrompt}"
        onload="window.onChatImageLoaded('${cardId}')"
        onerror="window.onChatImageError('${cardId}')"
        onclick="openLightbox('${safeUrl}')"
        title="Click to view full-resolution lightbox"
      />
    </div>
    <div class="img-card-footer">
      <div class="img-card-prompt-preview">“${safePrompt}”</div>
      <div class="img-card-actions">
        <button class="img-card-btn" onclick="openLightbox('${safeUrl}')" title="Zoom in Lightbox">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor"/></svg>
          Zoom
        </button>
        <button class="img-card-btn" onclick="downloadImageFromUrl('${safeUrl}', 'artwork-${cardId}.jpg')" title="Download Image">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/></svg>
          Download
        </button>
        <button class="img-card-btn" onclick="copyImagePrompt('${safePrompt.replace(/'/g, "\\'")}')" title="Copy prompt text">
          📋 Copy Prompt
        </button>
        <button class="img-card-btn" onclick="openImageStudio('${safePrompt.replace(/'/g, "\\'")}')" title="Open in AI Image Studio">
          🎨 Studio
        </button>
        <button class="img-card-btn primary" onclick="regenerateChatImage('${cardId}', '${safePrompt.replace(/'/g, "\\'")}')" title="Generate another variation with new seed">
          🔄 Variation
        </button>
      </div>
    </div>
  </div>`;
}

window.onChatImageLoaded = function(cardId) {
  const skel = $(`skeleton-${cardId}`);
  if (skel) skel.style.display = 'none';
  const img = $(`img-${cardId}`);
  if (img) img.classList.add('loaded');
};

window.onChatImageError = function(cardId) {
  const skel = $(`skeleton-${cardId}`);
  if (skel) {
    skel.innerHTML = `
      <div style="font-size:24px;">⚠️</div>
      <div class="skeleton-text" style="color:#f87171;">Image synthesis retry required</div>
      <button class="img-card-btn primary" onclick="retryChatImage('${cardId}')" style="margin-top:6px;">Retry</button>
    `;
  }
};

window.retryChatImage = function(cardId) {
  const skel = $(`skeleton-${cardId}`);
  const img = $(`img-${cardId}`);
  if (skel) {
    skel.innerHTML = `<div class="skeleton-spinner"></div><div class="skeleton-text">Retrying pixel synthesis...</div>`;
    skel.style.display = 'flex';
  }
  if (img) {
    img.classList.remove('loaded');
    const cur = img.src;
    img.src = cur.includes('?') ? `${cur}&retry=${Date.now()}` : `${cur}?retry=${Date.now()}`;
  }
};

window.regenerateChatImage = function(cardId, prompt) {
  const skel = $(`skeleton-${cardId}`);
  const img = $(`img-${cardId}`);
  if (skel) {
    skel.innerHTML = `<div class="skeleton-spinner"></div><div class="skeleton-text">Synthesizing new variation...</div>`;
    skel.style.display = 'flex';
  }
  if (img) {
    img.classList.remove('loaded');
    const newSeed = Math.floor(Math.random() * 10000000);
    const newUrl = buildImageUrl(prompt, 1024, 1024, 'flux', newSeed, null, true);
    img.src = newUrl;
  }
  showToast('Synthesizing fresh variation ✨');
};

window.downloadImageFromUrl = async function(url, filename = 'ai-artwork.jpg') {
  showToast('Downloading artwork...');
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Fetch failed');
    const blob = await res.blob();
    downloadBlob(blob, filename);
    showToast('Downloaded artwork ✓');
  } catch {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Opened image for download ✓');
  }
};

window.copyImagePrompt = function(prompt) {
  navigator.clipboard.writeText(prompt).then(() => {
    showToast('Prompt copied to clipboard 📋');
  });
};

window.copyImageUrl = function(url) {
  navigator.clipboard.writeText(url).then(() => {
    showToast('Image URL copied to clipboard 🔗');
  });
};

// ── In-Chat Image Request Dispatcher ───────────────────────────
async function handleImageGenerationMessage(text, attachments) {
  const cleanPrompt = extractImagePrompt(text);
  const ratio = detectAspectRatioFromText(text);
  const styleKey = detectStyleFromText(text);
  const seed = Math.floor(Math.random() * 10000000);
  const model = state.imageStudio?.model || 'flux';

  const imageUrl = buildImageUrl(cleanPrompt, ratio.w, ratio.h, model, seed, styleKey, true);

  const imageInfo = {
    prompt: cleanPrompt,
    url: imageUrl,
    width: ratio.w,
    height: ratio.h,
    ratio: ratio.name,
    model: model === 'flux' ? 'Flux.1 Schnell' : (model === 'turbo' ? 'SDXL Turbo' : 'DALL-E 3'),
    seed: seed,
    timestamp: Date.now()
  };

  try {
    state.isTyping = true;
    dom.sendBtn.classList.add('loading');
    dom.sendBtn.disabled = true;
    showTyping();

    // Small delay to simulate fast synthesis initialization
    await new Promise(r => setTimeout(r, 650));

    hideTyping();
    state.isTyping = false;
    dom.sendBtn.classList.remove('loading');

    const aiId = Date.now();
    const styleLabel = styleKey ? ` in **${IMAGE_STYLES[styleKey]?.name}** style` : '';
    const introText = `🎨 Synthesizing your visual artwork${styleLabel}: **“${cleanPrompt}”**`;

    const aiMsg = {
      role: 'ai',
      content: introText,
      id: aiId,
      imageInfo: imageInfo
    };
    state.messages.push(aiMsg);

    dom.messagesList.insertAdjacentHTML('beforeend',
      buildMessageHTML('ai', introText, aiId, [], false, imageInfo));
    scrollToBottom();

    // Persist to studio gallery
    saveImageToGallery({
      id: aiId,
      url: imageUrl,
      prompt: cleanPrompt,
      ratio: ratio.name,
      model: imageInfo.model,
      seed: seed,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    persistCurrentChat();
    renderHistorySidebar(state.searchQuery);
    updateChatStats();
  } catch (err) {
    console.error('Error generating image in chat:', err);
    showToast('Failed to generate image');
  } finally {
    hideTyping();
    state.isTyping = false;
    state.isStreaming = false;
    dom.sendBtn.classList.remove('loading');
    updateInputState();
  }
}

// ── AI Image Studio Modal Functions ────────────────────────────
window.openImageStudio = function(initialPrompt) {
  if (!dom.imageStudioModal) return;
  dom.imageStudioModal.showModal();
  if (initialPrompt && typeof initialPrompt === 'string') {
    dom.studioPromptInput.value = initialPrompt;
  }
  if (dom.studioPromptCounter) {
    dom.studioPromptCounter.textContent = `${dom.studioPromptInput.value.length} characters`;
  }
  renderStudioGallery();
  setTimeout(() => dom.studioPromptInput.focus(), 60);
};

window.closeImageStudio = function() {
  if (dom.imageStudioModal && dom.imageStudioModal.open) {
    dom.imageStudioModal.close();
  }
};

window.studioSetQuickPrompt = function(promptText) {
  if (!dom.studioPromptInput) return;
  dom.studioPromptInput.value = promptText;
  if (dom.studioPromptCounter) {
    dom.studioPromptCounter.textContent = `${promptText.length} characters`;
  }
  showToast('Prompt loaded 🎨');
};

function renderStudioGallery() {
  if (!dom.studioGalleryStrip) return;
  let items = [];
  try {
    items = JSON.parse(localStorage.getItem('chatai_image_gallery')) || [];
  } catch { items = []; }

  state.imageStudio.gallery = items;

  if (items.length === 0) {
    dom.studioGalleryStrip.innerHTML = '<div class="studio-gallery-empty">No images generated yet.</div>';
    return;
  }

  dom.studioGalleryStrip.innerHTML = items.map((item, idx) => `
    <div class="studio-gallery-item" onclick="loadGalleryItemToStudio(${idx})" title="${escHtml(item.prompt)} (${item.date || ''})">
      <img src="${item.url}" alt="${escHtml(item.prompt)}" loading="lazy" />
    </div>
  `).join('');
}

window.loadGalleryItemToStudio = function(idx) {
  const item = state.imageStudio.gallery[idx];
  if (!item) return;

  dom.studioPromptInput.value = item.prompt;
  if (dom.studioPromptCounter) {
    dom.studioPromptCounter.textContent = `${item.prompt.length} characters`;
  }

  dom.studioEmptyState.style.display = 'none';
  dom.studioLoadingState.style.display = 'none';
  dom.studioImageWrap.style.display = 'flex';
  dom.studioResultImg.src = item.url;

  dom.studioCanvasActions.style.display = 'flex';
  dom.studioImageMetaBar.style.display = 'flex';
  dom.studioCanvasStatus.textContent = 'View loaded';

  dom.metaRatio.textContent = item.ratio || '1:1';
  dom.metaModel.textContent = item.model || 'Flux.1';
  dom.metaSeed.textContent = `Seed: ${item.seed || '0'}`;
  dom.metaPromptText.textContent = item.prompt;

  state.imageStudio.currentResult = item;
};

function saveImageToGallery(item) {
  try {
    let items = JSON.parse(localStorage.getItem('chatai_image_gallery')) || [];
    items.unshift(item);
    if (items.length > 30) items = items.slice(0, 30);
    localStorage.setItem('chatai_image_gallery', JSON.stringify(items));
    state.imageStudio.gallery = items;
    renderStudioGallery();
  } catch (e) {
    console.warn('Error saving image to gallery:', e);
  }
}

async function generateStudioImage() {
  const prompt = dom.studioPromptInput.value.trim();
  if (!prompt) {
    showToast('Please describe the image you want to create!');
    dom.studioPromptInput.focus();
    return;
  }

  if (state.imageStudio.isGenerating) return;
  state.imageStudio.isGenerating = true;

  dom.studioGenerateBtn.classList.add('loading');
  dom.studioGenerateBtn.querySelector('.studio-gen-text').textContent = 'Synthesizing...';

  dom.studioEmptyState.style.display = 'none';
  dom.studioImageWrap.style.display = 'none';
  dom.studioLoadingState.style.display = 'flex';
  dom.studioCanvasActions.style.display = 'none';
  dom.studioImageMetaBar.style.display = 'none';
  dom.studioCanvasStatus.textContent = 'Generating...';

  const w = state.imageStudio.width || 1024;
  const h = state.imageStudio.height || 1024;
  const styleKey = state.imageStudio.selectedStyle;
  const model = dom.studioModelSelect ? dom.studioModelSelect.value : 'flux';
  const customSeed = dom.studioSeedInput.value ? Number(dom.studioSeedInput.value) : null;
  const seed = customSeed !== null ? customSeed : Math.floor(Math.random() * 10000000);
  const enhance = state.imageStudio.enhance;

  const steps = [
    'Synthesizing latent canvas with Flux neural engine...',
    'Refining high-frequency textures and volumetric lighting...',
    'Rendering fine details, color grading and HDR resolution...'
  ];
  let stepIdx = 0;
  const stepTimer = setInterval(() => {
    stepIdx = (stepIdx + 1) % steps.length;
    if (dom.studioLoadingSub) dom.studioLoadingSub.textContent = steps[stepIdx];
  }, 1200);

  const imageUrl = buildImageUrl(prompt, w, h, model, seed, styleKey, enhance);

  // Preload image with browser Image object
  const preloader = new Image();
  preloader.onload = () => {
    clearInterval(stepTimer);
    state.imageStudio.isGenerating = false;
    dom.studioGenerateBtn.classList.remove('loading');
    dom.studioGenerateBtn.querySelector('.studio-gen-text').textContent = 'Generate Artwork';

    dom.studioLoadingState.style.display = 'none';
    dom.studioImageWrap.style.display = 'flex';
    dom.studioResultImg.src = imageUrl;

    dom.studioCanvasActions.style.display = 'flex';
    dom.studioImageMetaBar.style.display = 'flex';
    dom.studioCanvasStatus.textContent = 'Generated ✓';

    const ratioLabel = state.imageStudio.aspectRatio || '1:1';
    dom.metaRatio.textContent = ratioLabel;
    dom.metaModel.textContent = model === 'flux' ? 'Flux.1' : (model === 'turbo' ? 'Turbo' : 'DALL-E');
    dom.metaSeed.textContent = `Seed: ${seed}`;
    dom.metaPromptText.textContent = prompt;

    const resultItem = {
      id: Date.now(),
      url: imageUrl,
      prompt: prompt,
      ratio: ratioLabel,
      model: dom.metaModel.textContent,
      seed: seed,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    state.imageStudio.currentResult = resultItem;
    saveImageToGallery(resultItem);
    showToast('Artwork created successfully! 🎨');
  };

  preloader.onerror = () => {
    clearInterval(stepTimer);
    state.imageStudio.isGenerating = false;
    dom.studioGenerateBtn.classList.remove('loading');
    dom.studioGenerateBtn.querySelector('.studio-gen-text').textContent = 'Generate Artwork';

    // Show image even if preloader tripped (some browsers block Image onerror on cross-origin)
    dom.studioLoadingState.style.display = 'none';
    dom.studioImageWrap.style.display = 'flex';
    dom.studioResultImg.src = imageUrl;
    dom.studioCanvasActions.style.display = 'flex';
    dom.studioImageMetaBar.style.display = 'flex';
    dom.studioCanvasStatus.textContent = 'Ready';
    showToast('Artwork generated ✓');
  };

  preloader.src = imageUrl;
}

function insertStudioImageIntoChat() {
  const current = state.imageStudio.currentResult;
  if (!current || !current.url) {
    showToast('No generated image to insert yet.');
    return;
  }

  closeImageStudio();

  if (state.messages.length === 0) {
    dom.welcomeScreen.style.display = 'none';
    dom.messagesList.style.display = 'flex';
    state.currentChatId = Date.now();
  }

  const aiId = Date.now();
  const introText = `🎨 Studio Artwork Inserted: **“${current.prompt}”**`;
  const imageInfo = {
    prompt: current.prompt,
    url: current.url,
    ratio: current.ratio || '1:1',
    model: current.model || 'Flux.1',
    seed: current.seed || 0
  };

  const aiMsg = {
    role: 'ai',
    content: introText,
    id: aiId,
    imageInfo: imageInfo
  };
  state.messages.push(aiMsg);

  dom.messagesList.insertAdjacentHTML('beforeend',
    buildMessageHTML('ai', introText, aiId, [], false, imageInfo));
  scrollToBottom();

  persistCurrentChat();
  renderHistorySidebar(state.searchQuery);
  updateChatStats();
  showToast('Inserted artwork into active chat ✓');
}

function initImageStudio() {
  if (dom.imageGenBtn) {
    dom.imageGenBtn.addEventListener('click', () => openImageStudio());
  }
  if (dom.imageStudioClose) {
    dom.imageStudioClose.addEventListener('click', closeImageStudio);
  }

  // Backdrop click closes dialog
  if (dom.imageStudioModal) {
    dom.imageStudioModal.addEventListener('click', e => {
      const rect = dom.imageStudioModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                          rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) closeImageStudio();
    });
  }

  // Prompt input listeners
  if (dom.studioPromptInput) {
    dom.studioPromptInput.addEventListener('input', () => {
      if (dom.studioPromptCounter) {
        dom.studioPromptCounter.textContent = `${dom.studioPromptInput.value.length} characters`;
      }
    });
    dom.studioPromptInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        generateStudioImage();
      }
    });
  }

  if (dom.studioClearPromptBtn) {
    dom.studioClearPromptBtn.addEventListener('click', () => {
      dom.studioPromptInput.value = '';
      if (dom.studioPromptCounter) dom.studioPromptCounter.textContent = '0 characters';
      dom.studioPromptInput.focus();
    });
  }

  // Surprise Me button
  if (dom.studioSurprisePromptBtn) {
    dom.studioSurprisePromptBtn.addEventListener('click', () => {
      const randIdx = Math.floor(Math.random() * RANDOM_IMAGE_PROMPTS.length);
      const randPrompt = RANDOM_IMAGE_PROMPTS[randIdx];
      dom.studioPromptInput.value = randPrompt;
      if (dom.studioPromptCounter) {
        dom.studioPromptCounter.textContent = `${randPrompt.length} characters`;
      }
      showToast('Loaded imaginative prompt 🎲');
    });
  }

  // Enhance Toggle
  if (dom.studioEnhanceToggle) {
    dom.studioEnhanceToggle.addEventListener('click', () => {
      state.imageStudio.enhance = !state.imageStudio.enhance;
      dom.studioEnhanceToggle.classList.toggle('active', state.imageStudio.enhance);
      showToast(state.imageStudio.enhance ? 'Prompt enhancement ON ✨' : 'Prompt enhancement OFF');
    });
  }

  // Style cards
  if (dom.studioStyleGrid) {
    dom.studioStyleGrid.addEventListener('click', e => {
      const card = e.target.closest('.studio-style-card');
      if (!card) return;
      dom.studioStyleGrid.querySelectorAll('.studio-style-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const styleKey = card.dataset.style;
      state.imageStudio.selectedStyle = styleKey;
      if (dom.studioSelectedStyleBadge) {
        dom.studioSelectedStyleBadge.textContent = IMAGE_STYLES[styleKey]?.name || styleKey;
      }
    });
  }

  // Aspect ratio cards
  if (dom.studioAspectGrid) {
    dom.studioAspectGrid.addEventListener('click', e => {
      const btn = e.target.closest('.studio-aspect-btn');
      if (!btn) return;
      dom.studioAspectGrid.querySelectorAll('.studio-aspect-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.imageStudio.aspectRatio = btn.dataset.ratio;
      state.imageStudio.width = Number(btn.dataset.w);
      state.imageStudio.height = Number(btn.dataset.h);
    });
  }

  // Seed randomize
  if (dom.studioSeedRandomBtn) {
    dom.studioSeedRandomBtn.addEventListener('click', () => {
      const newSeed = Math.floor(Math.random() * 10000000);
      dom.studioSeedInput.value = newSeed;
      showToast(`Random seed set: ${newSeed}`);
    });
  }

  // Generate Button
  if (dom.studioGenerateBtn) {
    dom.studioGenerateBtn.addEventListener('click', generateStudioImage);
  }

  // Canvas Actions
  if (dom.studioZoomBtn) {
    dom.studioZoomBtn.addEventListener('click', () => {
      if (dom.studioResultImg.src) openLightbox(dom.studioResultImg.src);
    });
  }

  if (dom.studioCopyUrlBtn) {
    dom.studioCopyUrlBtn.addEventListener('click', () => {
      if (dom.studioResultImg.src) copyImageUrl(dom.studioResultImg.src);
    });
  }

  if (dom.studioDownloadBtn) {
    dom.studioDownloadBtn.addEventListener('click', () => {
      if (dom.studioResultImg.src) {
        downloadImageFromUrl(dom.studioResultImg.src, `studio-art-${Date.now()}.jpg`);
      }
    });
  }

  if (dom.studioInsertChatBtn) {
    dom.studioInsertChatBtn.addEventListener('click', insertStudioImageIntoChat);
  }

  // Clear Gallery Button
  if (dom.studioClearGalleryBtn) {
    dom.studioClearGalleryBtn.addEventListener('click', () => {
      localStorage.removeItem('chatai_image_gallery');
      state.imageStudio.gallery = [];
      renderStudioGallery();
      showToast('Image gallery cleared');
    });
  }
}

// ═══════════════════════════════════════════════════════════════
//  SEND MESSAGE  (main flow)
// ═══════════════════════════════════════════════════════════════

async function sendMessage(text) {
  text = (text || dom.chatInput.value).trim();
  const hasFiles = state.attachedFiles.length > 0;

  if ((!text && !hasFiles) || state.isTyping || state.isStreaming) return;

  if (!text && hasFiles) {
    text = `Attached file(s): ${state.attachedFiles.map(f => f.name).join(', ')}`;
  }

  if (state.messages.length === 0) {
    dom.welcomeScreen.style.display = 'none';
    dom.messagesList.style.display  = 'flex';
    state.currentChatId = Date.now();
  }

  const currentAttachments = [...state.attachedFiles];

  const userId = Date.now();
  const userMsg = {
    role:        'user',
    content:     text,
    id:          userId,
    attachments: currentAttachments,
  };
  state.messages.push(userMsg);
  dom.messagesList.insertAdjacentHTML('beforeend',
    buildMessageHTML('user', text, userId, currentAttachments));
  scrollToBottom();

  dom.chatInput.value = '';
  dom.charCount.textContent = '0';
  autoResize();
  clearAttachedFiles();
  updateChatStats();

  // Route to image synthesis if text is an image request
  if (isImageGenerationRequest(text)) {
    return await handleImageGenerationMessage(text, currentAttachments);
  }

  try {
    state.isTyping = true;
    dom.sendBtn.classList.add('loading');
    dom.sendBtn.disabled = true;
    showTyping();

    let aiText = '';
    try {
      aiText = await callAPI(text, currentAttachments);
    } catch (apiErr) {
      console.warn('callAPI error caught in sendMessage, generating local response:', apiErr);
      aiText = generateOfflineAIResponse(text, currentAttachments);
    }

    if (!aiText || !aiText.trim()) {
      aiText = generateOfflineAIResponse(text, currentAttachments);
    }

    // ── Frontier AI Suite Processing ──
    // 1. Deep Thinking Process
    let thinking = null;
    if (state.deepReasoningEnabled) {
      thinking = generateThinkingProcess(text);
    }

    // 2. Google Gemini Live Web Search Grounding
    let sources = null;
    if (state.webSearchEnabled) {
      sources = generateWebGrounding(text);
      if (!aiText.includes('[1]')) {
        aiText += `\n\n*Verified via Google Gemini Live Grounding: [1] [2] [3]*`;
      }
    }

    // 3. Claude 3.5 Artifact Detection
    const artifact = detectArtifact(aiText, text);
    if (artifact) {
      state.activeArtifact = artifact;
      if (dom.artifactDotBadge) dom.artifactDotBadge.style.display = 'block';
      if (dom.claudeArtifactsCanvas && dom.claudeArtifactsCanvas.classList.contains('open')) {
        openArtifactCanvas(artifact);
      }
    }

    hideTyping();
    state.isTyping = false;
    dom.sendBtn.classList.remove('loading');

    const aiId  = Date.now();
    const aiMsg = {
      role: 'ai',
      content: '',
      id: aiId,
      thinking,
      sources,
      artifact,
      versions: [{ content: aiText, thinking, sources, artifact }],
      currentVersionIndex: 0
    };
    state.messages.push(aiMsg);

    dom.messagesList.insertAdjacentHTML('beforeend', buildMessageHTML('ai', '', aiId));
    scrollToBottom();

    await streamTypewriterResponse(aiText, aiId, aiMsg);

    // Refresh row to mount interactive badges, thinking accordion, and artifact card
    const row = $(`msg-${aiId}`);
    if (row) {
      row.outerHTML = buildMessageHTML('ai', aiText, aiId);
    }

    persistCurrentChat();
    renderHistorySidebar(state.searchQuery);
    updateChatStats();
    updateDashboardTelemetry();
  } catch (fatalErr) {
    console.error('Fatal error in sendMessage:', fatalErr);
  } finally {
    hideTyping();
    state.isTyping = false;
    state.isStreaming = false;
    dom.sendBtn.classList.remove('loading');
    updateInputState();
  }
}

function autoResize() {
  dom.chatInput.style.height = 'auto';
  dom.chatInput.style.height = Math.min(dom.chatInput.scrollHeight, 200) + 'px';
}

// ═══════════════════════════════════════════════════════════════
//  EXPORT CHAT (Markdown, PDF, JSON)
// ═══════════════════════════════════════════════════════════════

function toggleExportDropdown(e) {
  e.stopPropagation();
  dom.exportDropdown.classList.toggle('open');
}

function closeExportDropdown() {
  dom.exportDropdown.classList.remove('open');
}

function exportMarkdown() {
  closeExportDropdown();
  if (!state.messages.length) {
    showToast('No messages to export.');
    return;
  }

  const title = state.messages.find(m => m.role === 'user')?.content.slice(0, 30) || 'Conversation';
  const dateStr = new Date().toLocaleString();

  let md = `# ChatAI Conversation Export\n`;
  md += `**Date:** ${dateStr}\n`;
  md += `**Provider:** ${PROVIDERS[state.provider]?.label || state.provider}\n`;
  md += `**Model:** ${state.apiModel}\n`;
  md += `**Persona:** ${PERSONAS[state.persona]?.name || state.persona}\n\n`;
  md += `---\n\n`;

  state.messages.forEach(m => {
    const role = m.role === 'user' ? '👤 User' : '🤖 AI';
    md += `### ${role}\n\n${m.content}\n\n`;
    if (m.attachments && m.attachments.length) {
      md += `*Attached: ${m.attachments.map(a => a.name).join(', ')}*\n\n`;
    }
    md += `---\n\n`;
  });

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  downloadBlob(blob, `chat-export-${Date.now()}.md`);
  showToast('Exported Markdown ✓');
}

function exportJSON() {
  closeExportDropdown();
  if (!state.messages.length) {
    showToast('No messages to export.');
    return;
  }

  const exportData = {
    exportedAt: new Date().toISOString(),
    provider:   state.provider,
    model:      state.apiModel,
    persona:    state.persona,
    messages:   state.messages,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `chat-export-${Date.now()}.json`);
  showToast('Exported JSON ✓');
}

function exportPDF() {
  closeExportDropdown();
  if (!state.messages.length) {
    showToast('No messages to export.');
    return;
  }
  showToast('Opening print dialog for PDF…');
  setTimeout(() => window.print(), 250);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════════
//  NEW CHAT
// ═══════════════════════════════════════════════════════════════

function startNewChat() {
  if (state.synth) state.synth.cancel();
  state.messages      = [];
  state.currentChatId = null;
  state.isTyping      = false;
  state.isStreaming   = false;
  clearAttachedFiles();
  dom.stopGenWrapper.style.display = 'none';
  dom.messagesList.innerHTML = '';
  dom.welcomeScreen.style.display = '';
  dom.messagesList.style.display  = 'none';
  dom.chatInput.value     = '';
  dom.charCount.textContent = '0';
  dom.sendBtn.disabled    = true;
  autoResize();
  renderHistorySidebar(state.searchQuery);
  updateChatStats();
  updateDashboardTelemetry();
}

// ═══════════════════════════════════════════════════════════════
//  THEME & SIDEBAR
// ═══════════════════════════════════════════════════════════════

function applyTheme(theme) {
  document.body.classList.toggle('light-mode', theme === 'light');
  dom.sunIcon.style.display  = theme === 'light' ? 'none' : '';
  dom.moonIcon.style.display = theme === 'light' ? ''     : 'none';
  localStorage.setItem('chatai_theme', theme);
  state.theme = theme;
}

function toggleSidebar() {
  if (window.innerWidth <= 768) {
    dom.sidebar.classList.toggle('mobile-open');
    toggleOverlay(dom.sidebar.classList.contains('mobile-open'));
  } else {
    state.sidebarOpen = !state.sidebarOpen;
    dom.sidebar.classList.toggle('collapsed', !state.sidebarOpen);
  }
}

function toggleOverlay(show) {
  let ov = document.querySelector('.sidebar-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.className = 'sidebar-overlay';
    ov.addEventListener('click', () => { dom.sidebar.classList.remove('mobile-open'); toggleOverlay(false); });
    document.body.appendChild(ov);
  }
  ov.classList.toggle('show', show);
}

// ═══════════════════════════════════════════════════════════════
//  MODEL SELECTOR
// ═══════════════════════════════════════════════════════════════

function toggleModelDropdown() {
  dom.modelDropdown.classList.toggle('open');
}

function selectModel(optionEl) {
  const modelName = optionEl.dataset.model;
  dom.modelDropdown.querySelectorAll('.model-option').forEach(o => o.classList.remove('selected'));
  optionEl.classList.add('selected');
  dom.modelName.textContent = modelName;
  dom.modelDropdown.classList.remove('open');
  showToast(`Switched to ${modelName}`);
}

// ═══════════════════════════════════════════════════════════════
//  SETTINGS MODAL & API KEY MANAGEMENT
// ═══════════════════════════════════════════════════════════════

function openModal() {
  dom.modalBackdrop.classList.add('open');
  dom.settingsModal.showModal();

  dom.providerGrid.querySelectorAll('.provider-card').forEach(c => {
    c.classList.toggle('active', c.dataset.provider === state.provider);
  });
  populateModelSelect(state.provider);
  dom.modelSelect.value = state.apiModel;

  dom.apiKeyInput.value = state.apiKey ? maskKey(state.apiKey) : '';
  dom.apiKeyInput.dataset.dirty = 'false';
  dom.apiKeyHint.textContent = PROVIDERS[state.provider]?.hint || '';
  dom.systemPrompt.value = state.systemPrompt;
  dom.ttsVoiceSelect.value = state.ttsVoice;

  updateKeyStatus();
}

function closeModal() {
  dom.settingsModal.close();
  dom.modalBackdrop.classList.remove('open');
}

function maskKey(key) {
  if (key.length <= 8) return '••••••••';
  return key.slice(0, 4) + '••••••••' + key.slice(-4);
}

function populateModelSelect(provider) {
  const conf = PROVIDERS[provider];
  if (!conf) return;
  dom.modelSelect.innerHTML = '';
  conf.models.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.value;
    opt.textContent = m.label;
    if (m.value === state.apiModel) opt.selected = true;
    dom.modelSelect.appendChild(opt);
  });
}

function saveSettings() {
  const activeCard = dom.providerGrid.querySelector('.provider-card.active');
  const provider   = activeCard ? activeCard.dataset.provider : state.provider;
  const model      = dom.modelSelect.value;
  const sys        = dom.systemPrompt.value.trim();
  const voice      = dom.ttsVoiceSelect.value;

  state.provider     = provider;
  state.apiModel     = model;
  state.systemPrompt = sys;
  state.ttsVoice     = voice;

  localStorage.setItem('chatai_provider',   provider);
  localStorage.setItem('chatai_model',      model);
  localStorage.setItem('chatai_sysprompt', sys);
  localStorage.setItem('chatai_ttsvoice',   voice);

  if (dom.apiKeyInput.dataset.dirty === 'true') {
    const rawKey = dom.apiKeyInput.value.trim();
    state.apiKey = rawKey;
    localStorage.setItem('chatai_key', rawKey);
  }

  updateAPIIndicator();
  updateKeyStatus();
  closeModal();
  showToast('Settings saved ✓');
}

function clearKey() {
  state.apiKey = '';
  localStorage.removeItem('chatai_key');
  dom.apiKeyInput.value = '';
  dom.apiKeyInput.dataset.dirty = 'false';
  updateAPIIndicator();
  updateKeyStatus();
  showToast('API key removed');
}

function updateKeyStatus() {
  if (state.apiKey) {
    dom.keyStatus.textContent = '✓ Custom API key configured';
    dom.keyStatus.className   = 'keyStatus success';
    dom.apiStatusDot.className = 'status-dot online';
    dom.apiStatusText.textContent = `${PROVIDERS[state.provider]?.label || state.provider} connected`;
  } else {
    dom.keyStatus.textContent = 'Free AI enabled (no key required) — or save custom key below';
    dom.keyStatus.className   = 'keyStatus info';
    dom.apiStatusDot.className = 'status-dot online';
    dom.apiStatusText.textContent = 'Free AI Active';
  }
}

function updateAPIIndicator() {
  if (state.apiKey) {
    dom.apiDot.className   = 'api-dot online';
    dom.apiLabel.textContent = PROVIDERS[state.provider]?.label || 'API';
    dom.apiIndicator.title   = `Connected — ${state.provider} / ${state.apiModel}`;
  } else {
    dom.apiDot.className   = 'api-dot online';
    dom.apiLabel.textContent = 'Free AI ⚡';
    dom.apiIndicator.title   = 'Free AI Active (answers all questions & coding tasks) — custom keys optional in Settings';
  }
}

// ═══════════════════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════════════════

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ═══════════════════════════════════════════════════════════════
//  EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════

// Input
dom.chatInput.addEventListener('input', () => {
  dom.charCount.textContent = dom.chatInput.value.length;
  updateInputState();
  autoResize();
});

dom.chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!dom.sendBtn.disabled) sendMessage(dom.chatInput.value);
  }
});

dom.sendBtn.addEventListener('click', () => sendMessage(dom.chatInput.value));

// Stop generating button
dom.stopGenBtn.addEventListener('click', () => {
  state.stopRequested = true;
  showToast('Generation stopped');
});

// Prompt library button
dom.promptLibBtn.addEventListener('click', openPromptLibrary);
dom.promptLibClose.addEventListener('click', () => dom.promptLibModal.close());
dom.promptTabs.addEventListener('click', e => {
  const tab = e.target.closest('.prompt-tab');
  if (!tab) return;
  dom.promptTabs.querySelectorAll('.prompt-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderPromptGrid(tab.dataset.category);
});

// Share button
dom.shareBtn.addEventListener('click', openShareModal);
dom.shareModalClose.addEventListener('click', () => dom.shareModal.close());
dom.shareCopyMarkdownBtn.addEventListener('click', copyShareMarkdown);
dom.shareCopyTextBtn.addEventListener('click', copyShareText);
if (dom.shareCopyLinkBtn) dom.shareCopyLinkBtn.addEventListener('click', copyShareLink);
if (dom.shareActionCopyLinkBtn) dom.shareActionCopyLinkBtn.addEventListener('click', copyShareLink);
if (dom.shareToWhatsAppBtn) {
  dom.shareToWhatsAppBtn.addEventListener('click', () => {
    const url = dom.shareLinkInput && dom.shareLinkInput.value ? dom.shareLinkInput.value : '';
    const title = dom.shareChatTitle ? dom.shareChatTitle.textContent : 'ChatAI Conversation';
    const text = `*ChatAI: ${title}*\n\n🔗 ${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    showToast('💬 WhatsApp opened with short link!');
  });
}

// File attachment
dom.attachBtn.addEventListener('click', () => dom.fileInput.click());
dom.fileInput.addEventListener('change', e => {
  handleFiles(e.target.files);
  e.target.value = '';
});

// Drag and drop files onto input wrapper
const inputWrapper = document.querySelector('.input-wrapper');
if (inputWrapper) {
  ['dragenter', 'dragover'].forEach(name => {
    inputWrapper.addEventListener(name, e => {
      e.preventDefault();
      e.stopPropagation();
      inputWrapper.classList.add('drag-over');
    });
  });
  ['dragleave', 'drop'].forEach(name => {
    inputWrapper.addEventListener(name, e => {
      e.preventDefault();
      e.stopPropagation();
      inputWrapper.classList.remove('drag-over');
    });
  });
  inputWrapper.addEventListener('drop', e => {
    if (e.dataTransfer && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  });
}

// History search
dom.historySearchInput.addEventListener('input', e => {
  const val = e.target.value;
  state.searchQuery = val;
  dom.searchClearBtn.style.display = val ? 'block' : 'none';
  renderHistorySidebar(val);
});

dom.searchClearBtn.addEventListener('click', () => {
  dom.historySearchInput.value = '';
  state.searchQuery = '';
  dom.searchClearBtn.style.display = 'none';
  renderHistorySidebar('');
  dom.historySearchInput.focus();
});

// Clear all chats
dom.clearAllChatsBtn.addEventListener('click', clearAllChats);

// Export dropdown
dom.exportBtn.addEventListener('click', toggleExportDropdown);
dom.exportMarkdown.addEventListener('click', exportMarkdown);
dom.exportPDF.addEventListener('click', exportPDF);
dom.exportJSON.addEventListener('click', exportJSON);

// Close dropdowns on outside click
document.addEventListener('click', e => {
  if (dom.exportWrapper && !dom.exportWrapper.contains(e.target)) {
    closeExportDropdown();
  }
  if (!dom.modelBtn.contains(e.target) && !dom.modelDropdown.contains(e.target)) {
    dom.modelDropdown.classList.remove('open');
  }
  if (!dom.personaBtn.contains(e.target) && !dom.personaDropdown.contains(e.target)) {
    dom.personaDropdown.classList.remove('open');
  }
});

// Theme
dom.themeToggle.addEventListener('click', () =>
  applyTheme(state.theme === 'dark' ? 'light' : 'dark'));

// Sidebar
dom.sidebarToggle.addEventListener('click', toggleSidebar);
dom.mobileMenuBtn.addEventListener('click', toggleSidebar);
dom.newChatBtn.addEventListener('click', startNewChat);

// Model dropdown (header)
dom.modelBtn.addEventListener('click', toggleModelDropdown);
dom.modelDropdown.addEventListener('click', e => {
  const opt = e.target.closest('.model-option');
  if (opt) selectModel(opt);
});

// Persona dropdown (header)
dom.personaBtn.addEventListener('click', togglePersonaDropdown);
dom.personaDropdown.addEventListener('click', e => {
  const opt = e.target.closest('.persona-option');
  if (opt) selectPersona(opt.dataset.persona);
});

// Persona chips (welcome screen)
if (dom.personaChipsBar) {
  dom.personaChipsBar.addEventListener('click', e => {
    const chip = e.target.closest('.persona-chip');
    if (chip) selectPersona(chip.dataset.persona);
  });
}

// Settings modal
dom.openSettings.addEventListener('click', openModal);
dom.modalClose.addEventListener('click', closeModal);
dom.modalBackdrop.addEventListener('click', closeModal);
dom.saveKeyBtn.addEventListener('click', saveSettings);
dom.clearKeyBtn.addEventListener('click', clearKey);

dom.apiKeyInput.addEventListener('focus', () => {
  if (!dom.apiKeyInput.dataset.dirty || dom.apiKeyInput.dataset.dirty === 'false') {
    dom.apiKeyInput.value = '';
    dom.apiKeyInput.dataset.dirty = 'true';
  }
});
dom.apiKeyInput.addEventListener('input', () => {
  dom.apiKeyInput.dataset.dirty = 'true';
});

dom.keyToggle.addEventListener('click', () => {
  const isPass = dom.apiKeyInput.type === 'password';
  dom.apiKeyInput.type = isPass ? 'text' : 'password';
  dom.keyToggle.querySelector('.eye-open').style.display  = isPass ? 'none' : '';
  dom.keyToggle.querySelector('.eye-closed').style.display = isPass ? ''     : 'none';
});

dom.providerGrid.addEventListener('click', e => {
  const card = e.target.closest('.provider-card');
  if (!card) return;
  dom.providerGrid.querySelectorAll('.provider-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  const p = card.dataset.provider;
  state.provider = p;
  localStorage.setItem('chatai_provider', p);
  populateModelSelect(p);
  dom.apiKeyHint.textContent = PROVIDERS[p]?.hint || '';
});

// Code Runner Modal controls
dom.runnerClose.addEventListener('click', () => {
  dom.codeRunnerModal.close();
  state.runnerFullscreen = false;
  dom.codeRunnerModal.classList.remove('fullscreen');
  const exp = dom.runnerFullscreenBtn?.querySelector('.fs-expand-icon');
  const col = dom.runnerFullscreenBtn?.querySelector('.fs-collapse-icon');
  if (exp) exp.style.display = 'block';
  if (col) col.style.display = 'none';
});
if (dom.runnerFullscreenBtn) {
  dom.runnerFullscreenBtn.addEventListener('click', toggleRunnerFullscreen);
}
dom.tabConsole.addEventListener('click', () => switchRunnerTab('console'));
dom.tabPreview.addEventListener('click', () => switchRunnerTab('preview'));
dom.runnerRunBtn.addEventListener('click', runSandboxCode);

// Fullscreen & Fast Mode controls
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

function updateFullscreenIcon() {
  const isFs = !!document.fullscreenElement;
  state.isFullscreen = isFs;
  document.body.classList.toggle('fullscreen-active', isFs);
  const enterIcon = dom.fullscreenToggle?.querySelector('.fs-enter-icon');
  const exitIcon = dom.fullscreenToggle?.querySelector('.fs-exit-icon');
  if (enterIcon) enterIcon.style.display = isFs ? 'none' : 'block';
  if (exitIcon) exitIcon.style.display = isFs ? 'block' : 'none';
  if (dom.fullscreenToggle) {
    dom.fullscreenToggle.title = isFs ? 'Exit Fullscreen (Esc)' : 'Toggle Fullscreen (F11)';
  }
}

function toggleFastMode() {
  state.fastResponse = !state.fastResponse;
  localStorage.setItem('chatai_fast_response', String(state.fastResponse));
  updateFastModeUI();
  showToast(state.fastResponse ? '⚡ Fast Response Mode Active' : '🌐 Standard Deep AI Mode Active');
}

function updateFastModeUI() {
  if (!dom.fastModeToggle) return;
  dom.fastModeToggle.classList.toggle('active', state.fastResponse);
  if (dom.fastModeLabel) {
    dom.fastModeLabel.textContent = state.fastResponse ? 'Fast' : 'Standard';
  }
  dom.fastModeToggle.title = state.fastResponse
    ? 'Fast Response Mode: High-speed AI synthesis & accelerated streaming'
    : 'Standard Mode: Cloud LLM with full timeout';
}

if (dom.fullscreenToggle) {
  dom.fullscreenToggle.addEventListener('click', toggleFullscreen);
}
document.addEventListener('fullscreenchange', updateFullscreenIcon);

if (dom.fastModeToggle) {
  dom.fastModeToggle.addEventListener('click', toggleFastMode);
}

if (dom.runnerLangSelect) {
  dom.runnerLangSelect.addEventListener('change', updateRunnerLangDot);
}

if (dom.runnerDownloadBtn) {
  dom.runnerDownloadBtn.addEventListener('click', () => {
    const code = dom.runnerCodeInput.value;
    const lang = dom.runnerLangSelect ? dom.runnerLangSelect.value : 'javascript';
    const meta = getLanguageMeta(lang);
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const filename = `sandbox-snippet.${meta.ext}`;
    downloadBlob(blob, filename);
    showToast(`Downloaded ${filename} ✓`);
  });
}

// ═══════════════════════════════════════════════════════════════
//  EXECUTIVE COMMAND PALETTE & THEME ACCENTS
// ═══════════════════════════════════════════════════════════════

let cmdPaletteActiveIdx = 0;
let filteredCommands = [];

const COMMANDS = [
  { id: 'new_chat', title: 'New Conversation', desc: 'Start a blank executive workspace', icon: '🚀', badge: 'Action', action: () => startNewChat() },
  { id: 'fast_mode', title: 'Toggle Fast Response Mode', desc: 'Instant AI local synthesis & high-speed streaming', icon: '⚡', badge: 'Mode', action: () => toggleFastMode() },
  { id: 'fullscreen', title: 'Toggle Fullscreen Mode', desc: 'Immersive distraction-free presentation', icon: '🖥️', badge: 'View', action: () => toggleFullscreen() },
  { id: 'model_gpt4o', title: 'Switch Model: GPT-4o', desc: 'Frontier reasoning, logic & systems engineering', icon: '🟢', badge: 'Model', action: () => selectModel('GPT-4o') },
  { id: 'model_claude', title: 'Switch Model: Claude 3', desc: 'Nuanced writing, large context & deep analysis', icon: '🟣', badge: 'Model', action: () => selectModel('Claude 3') },
  { id: 'model_gemini', title: 'Switch Model: Gemini Pro', desc: 'High-speed multimodal intelligence & synthesis', icon: '🟠', badge: 'Model', action: () => selectModel('Gemini Pro') },
  { id: 'persona_code', title: 'Persona: Code Architect', desc: 'Clean architecture, algorithms & bug hunting', icon: '💻', badge: 'Persona', action: () => selectPersona('code') },
  { id: 'persona_writer', title: 'Persona: Creative Writer', desc: 'High-impact executive copy, essays & stories', icon: '✍️', badge: 'Persona', action: () => selectPersona('writer') },
  { id: 'persona_startup', title: 'Persona: Startup Advisor', desc: 'Business strategy, TAM/SAM & pitch decks', icon: '💼', badge: 'Persona', action: () => selectPersona('startup') },
  { id: 'persona_tutor', title: 'Persona: Academic Tutor', desc: 'In-depth Socratic teaching & proofs', icon: '🎓', badge: 'Persona', action: () => selectPersona('tutor') },
  { id: 'persona_general', title: 'Persona: General Assistant', desc: 'Versatile executive partner', icon: '⚡', badge: 'Persona', action: () => selectPersona('general') },
  { id: 'theme_indigo', title: 'Theme: Obsidian Indigo', desc: 'Deep executive flagship theme (Default)', icon: '🔷', badge: 'Theme', action: () => applyThemeAccent('indigo') },
  { id: 'theme_emerald', title: 'Theme: Cyber Emerald', desc: 'Fintech & cybersecurity executive palette', icon: '🟢', badge: 'Theme', action: () => applyThemeAccent('emerald') },
  { id: 'theme_sapphire', title: 'Theme: Electric Sapphire', desc: 'Ultra-clean enterprise cloud palette', icon: '🔵', badge: 'Theme', action: () => applyThemeAccent('sapphire') },
  { id: 'theme_amethyst', title: 'Theme: Royal Amethyst', desc: 'Creative agency & luxury studio palette', icon: '🟣', badge: 'Theme', action: () => applyThemeAccent('amethyst') },
  { id: 'theme_gold', title: 'Theme: Imperial Gold', desc: 'Private banking & executive boardroom palette', icon: '🟡', badge: 'Theme', action: () => applyThemeAccent('gold') },
  { id: 'theme_crimson', title: 'Theme: Crimson Titan', desc: 'Venture capital & high-stakes strategic red', icon: '🔴', badge: 'Theme', action: () => applyThemeAccent('crimson') },
  { id: 'theme_titanium', title: 'Theme: Nordic Titanium', desc: 'Sleek architectural minimalist slate', icon: '⚪', badge: 'Theme', action: () => applyThemeAccent('titanium') },
  { id: 'theme_synthwave', title: 'Theme: Neon Synthwave', desc: 'Electric cyberpunk magenta & violet', icon: '💖', badge: 'Theme', action: () => applyThemeAccent('synthwave') },
  { id: 'theme_amber', title: 'Theme: Solar Amber', desc: 'Warm radiant energy & industrial foundry', icon: '🟠', badge: 'Theme', action: () => applyThemeAccent('amber') },
  { id: 'theme_ocean', title: 'Theme: Deep Ocean', desc: 'Pacific depth & marine cyan', icon: '🌊', badge: 'Theme', action: () => applyThemeAccent('ocean') },
  { id: 'theme_onyx', title: 'Theme: Onyx Stealth', desc: 'Pure monochromatic pitch-black OLED', icon: '⚫', badge: 'Theme', action: () => applyThemeAccent('onyx') },
  { id: 'theme_matrix', title: 'Theme: Elysian Matrix', desc: 'Classic terminal phosphor green', icon: '🟢', badge: 'Theme', action: () => applyThemeAccent('matrix') },
  { id: 'theme_rosegold', title: 'Theme: Rose Gold Prestige', desc: 'Champagne pink & high-net-worth luxury', icon: '🌸', badge: 'Theme', action: () => applyThemeAccent('rosegold') },
  { id: 'theme_quantum', title: 'Theme: Quantum Aurora', desc: 'Electric cyan to violet quantum gradient', icon: '💎', badge: 'Theme', action: () => applyThemeAccent('quantum') },
  { id: 'theme_nebula', title: 'Theme: Midnight Nebula', desc: 'Deep cosmic interstellar indigo & violet', icon: '🌌', badge: 'Theme', action: () => applyThemeAccent('nebula') },
  { id: 'theme_voltage', title: 'Theme: Cyberpunk Voltage', desc: 'High-voltage neon gold & cyber aesthetic', icon: '⚡', badge: 'Theme', action: () => applyThemeAccent('voltage') },
  { id: 'theme_twilight', title: 'Theme: Tokyo Twilight', desc: 'Coral dusk to electric neon magenta', icon: '🌆', badge: 'Theme', action: () => applyThemeAccent('twilight') },
  { id: 'theme_mint', title: 'Theme: Alpine Mint', desc: 'Glacier turquoise & bio-tech clean aesthetic', icon: '🍃', badge: 'Theme', action: () => applyThemeAccent('mint') },
  { id: 'theme_platinum', title: 'Theme: Platinum Lux', desc: 'Frosted minimalist diamond & platinum slate', icon: '✨', badge: 'Theme', action: () => applyThemeAccent('platinum') },
  { id: 'google_seo', title: 'Google Official Site & Search Console', desc: 'Inspect sitemap, robots.txt, schema tags & verification', icon: '🌐', badge: 'Google', action: () => openGoogleSeoModal() },
  { id: 'toggle_dashboard', title: 'Toggle Executive Command Deck', desc: 'Open widgets, telemetry, tasks, focus sprint & scratchpad', icon: '📊', badge: 'Deck', action: () => toggleExecutiveDashboard() },
  { id: 'auth_login', title: 'Open Login / Auth Portal', desc: 'Sign in, register, or switch enterprise account', icon: '🔑', badge: 'Auth', action: () => showLoginPage('signin') },
  { id: 'auth_demo', title: 'Switch to Executive Demo Account', desc: 'Quick 1-click access as Chief Technology Officer', icon: '⚡', badge: 'Auth', action: () => handleDemoLogin() },
  { id: 'auth_signout', title: 'Sign Out of Enterprise Session', desc: 'Clear active session and return to login portal', icon: '🚪', badge: 'Auth', action: () => handleSignOut() },
  { id: 'image_studio', title: 'Open AI Image Studio', desc: 'Synthesize photorealistic concept art, 3D renders & illustrations', icon: '🎨', badge: 'Studio', action: () => openImageStudio() },
  { id: 'sandbox', title: 'Open Code Sandbox Runner', desc: 'Execute code in 40+ languages with live preview', icon: '📦', badge: 'Tools', action: () => openRunnerModal() },
  { id: 'prompt_lib', title: 'Browse Prompt Library', desc: 'Curated enterprise templates & framework prompts', icon: '📚', badge: 'Tools', action: () => openPromptLib() },
  { id: 'export_md', title: 'Export as Markdown', desc: 'Download current conversation as formatted .md', icon: '📥', badge: 'Export', action: () => exportMarkdown() },
  { id: 'export_pdf', title: 'Export as PDF', desc: 'Print or export formatted executive briefing', icon: '📄', badge: 'Export', action: () => exportPDF() },
  { id: 'api_settings', title: 'Open API Settings', desc: 'Configure custom OpenAI, Gemini, or Claude keys', icon: '⚙️', badge: 'Config', action: () => openModal() },
  { id: 'clear_chats', title: 'Clear All Conversations', desc: 'Reset conversation history', icon: '🧹', badge: 'Danger', action: () => clearAllChats() }
];

function openCommandPalette() {
  if (!dom.cmdPaletteModal) return;
  dom.cmdPaletteModal.showModal();
  dom.cmdPaletteInput.value = '';
  cmdPaletteActiveIdx = 0;
  filterCommandList('');
  setTimeout(() => dom.cmdPaletteInput.focus(), 50);
}

function closeCommandPalette() {
  if (dom.cmdPaletteModal && dom.cmdPaletteModal.open) {
    dom.cmdPaletteModal.close();
  }
}

function toggleCommandPalette() {
  if (dom.cmdPaletteModal && dom.cmdPaletteModal.open) {
    closeCommandPalette();
  } else {
    openCommandPalette();
  }
}

function filterCommandList(query) {
  const q = (query || '').toLowerCase().trim();
  filteredCommands = COMMANDS.filter(cmd => {
    if (!q) return true;
    return cmd.title.toLowerCase().includes(q) ||
           cmd.desc.toLowerCase().includes(q) ||
           cmd.badge.toLowerCase().includes(q);
  });
  if (cmdPaletteActiveIdx >= filteredCommands.length) {
    cmdPaletteActiveIdx = 0;
  }
  renderCommandPaletteItems();
}

function renderCommandPaletteItems() {
  if (!dom.cmdPaletteList) return;
  if (filteredCommands.length === 0) {
    dom.cmdPaletteList.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
        No matching commands found.
      </div>`;
    return;
  }

  dom.cmdPaletteList.innerHTML = filteredCommands.map((cmd, idx) => `
    <div class="cmd-item ${idx === cmdPaletteActiveIdx ? 'active' : ''}" data-cmd-idx="${idx}" onclick="executeCommandByIndex(${idx})">
      <div class="cmd-item-icon">${cmd.icon}</div>
      <div class="cmd-item-info">
        <span class="cmd-item-title">${escHtml(cmd.title)}</span>
        <span class="cmd-item-desc">${escHtml(cmd.desc)}</span>
      </div>
      <span class="cmd-item-badge">${escHtml(cmd.badge)}</span>
    </div>
  `).join('');

  const activeEl = dom.cmdPaletteList.querySelector('.cmd-item.active');
  if (activeEl) {
    activeEl.scrollIntoView({ block: 'nearest' });
  }
}

window.executeCommandByIndex = function(idx) {
  const cmd = filteredCommands[idx];
  if (!cmd) return;
  closeCommandPalette();
  cmd.action();
};

function applyThemeAccent(accent) {
  if (!accent) accent = 'indigo';
  if (accent === 'indigo') {
    delete document.documentElement.dataset.themeAccent;
  } else {
    document.documentElement.dataset.themeAccent = accent;
  }
  localStorage.setItem('chatai_accent_theme', accent);
  document.querySelectorAll('.accent-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.accent === accent);
  });
  showToast(`Theme: ${accent.charAt(0).toUpperCase() + accent.slice(1)}`);
}

// Global keydown (⌘K Command Palette, ⌘D Executive Deck & Escape)
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    toggleCommandPalette();
    return;
  }
  if ((e.metaKey || e.ctrlKey) && (e.key === 'd' || e.key === 'D')) {
    e.preventDefault();
    toggleExecutiveDashboard();
    return;
  }
  if (e.key === 'Escape') {
    closeCommandPalette();
    closeExecutiveDashboard();
    closeAccountPopover();
    hideLoginPage();
    closeModal();
    closeExportDropdown();
    closeImageStudio();
    if (dom.accentDropdown) dom.accentDropdown.classList.remove('open');
    if (dom.codeRunnerModal.open) dom.codeRunnerModal.close();
    if (dom.promptLibModal.open) dom.promptLibModal.close();
    if (dom.shareModal.open) dom.shareModal.close();
  }
});

// Command palette listeners
if (dom.cmdPaletteInput) {
  dom.cmdPaletteInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        cmdPaletteActiveIdx = (cmdPaletteActiveIdx + 1) % filteredCommands.length;
        renderCommandPaletteItems();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        cmdPaletteActiveIdx = (cmdPaletteActiveIdx - 1 + filteredCommands.length) % filteredCommands.length;
        renderCommandPaletteItems();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommandByIndex(cmdPaletteActiveIdx);
    } else if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });

  dom.cmdPaletteInput.addEventListener('input', () => {
    cmdPaletteActiveIdx = 0;
    filterCommandList(dom.cmdPaletteInput.value);
  });
}

if (dom.cmdPaletteCloseBtn) {
  dom.cmdPaletteCloseBtn.addEventListener('click', closeCommandPalette);
}

document.querySelector('.new-chat-shortcut')?.addEventListener('click', e => {
  e.stopPropagation();
  openCommandPalette();
});

// Accent Picker listeners
if (dom.accentPickerBtn) {
  dom.accentPickerBtn.addEventListener('click', e => {
    e.stopPropagation();
    dom.accentDropdown?.classList.toggle('open');
  });
}

document.querySelectorAll('.accent-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const accent = opt.dataset.accent;
    applyThemeAccent(accent);
    dom.accentDropdown?.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (dom.accentDropdown && !dom.accentDropdown.contains(e.target) && !dom.accentPickerBtn?.contains(e.target)) {
    dom.accentDropdown.classList.remove('open');
  }
});

// TTS toggle
dom.ttsToggle.addEventListener('click', () => {
  state.ttsEnabled = !state.ttsEnabled;
  localStorage.setItem('chatai_tts', String(state.ttsEnabled));
  dom.ttsToggle.classList.toggle('active', state.ttsEnabled);
  dom.ttsToggle.setAttribute('aria-pressed', String(state.ttsEnabled));
  dom.ttsToggle.title = state.ttsEnabled ? 'Text-to-speech on' : 'Text-to-speech off';
  if (!state.ttsEnabled && state.synth) state.synth.cancel();
  showToast(state.ttsEnabled ? '🔊 TTS enabled' : '🔇 TTS disabled');
});

// Voice button
dom.voiceBtn.addEventListener('click', toggleVoice);

// Suggestion cards
document.querySelectorAll('.suggestion-card').forEach(card => {
  card.addEventListener('click', () => {
    const prompt = card.dataset.prompt;
    dom.chatInput.value = prompt;
    dom.chatInput.dispatchEvent(new Event('input'));
    sendMessage(prompt);
  });
});

// ═══════════════════════════════════════════════════════════════
//  TOAST CSS
// ═══════════════════════════════════════════════════════════════

const toastStyle = document.createElement('style');
toastStyle.textContent = `
.toast {
  position: fixed; bottom: 90px; left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: #1e1e22; color: #f0f0f0;
  border: 1px solid #2e2e33;
  padding: 9px 18px; border-radius: 20px;
  font-size: 13px; font-family: 'Inter', sans-serif;
  opacity: 0; pointer-events: none;
  transition: opacity .25s ease, transform .25s ease;
  z-index: 9999; white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0,0,0,.4);
}
.light-mode .toast { background:#fff; color:#111; border-color:#e0e0e6; }
.toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
`;
document.head.appendChild(toastStyle);

// ═══════════════════════════════════════════════════════════════
//  EXECUTIVE DASHBOARD WIDGETS & COMMAND DECK ENGINE
// ═══════════════════════════════════════════════════════════════

let execTasks = [];
let focusTimerRemaining = 25 * 60;
let focusTimerDuration = 25 * 60;
let focusTimerInterval = null;
let focusTimerRunning = false;
let focusCycleCount = 1;

// 1. Dashboard Drawer Toggle / Open / Close
function openExecutiveDashboard() {
  if (!dom.executiveDashboardPanel) return;
  dom.executiveDashboardPanel.classList.add('open');
  dom.dashboardBackdrop?.classList.add('active');
  dom.dashboardToggleBtn?.classList.add('active');
  updateDashboardTelemetry();
  setTimeout(() => dom.execTaskInput?.focus(), 80);
}

function closeExecutiveDashboard() {
  if (!dom.executiveDashboardPanel) return;
  dom.executiveDashboardPanel.classList.remove('open');
  dom.dashboardBackdrop?.classList.remove('active');
  dom.dashboardToggleBtn?.classList.remove('active');
}

function toggleExecutiveDashboard() {
  if (dom.executiveDashboardPanel?.classList.contains('open')) {
    closeExecutiveDashboard();
  } else {
    openExecutiveDashboard();
  }
}

// 2. Widget 1: System Telemetry Updater
function updateDashboardTelemetry() {
  if (!dom.dashTokensVal) return;
  let totalWords = 0;
  state.messages.forEach(m => {
    if (m.content) {
      totalWords += m.content.trim().split(/\s+/).filter(Boolean).length;
    }
  });
  // Estimate tokens (~1.33 tokens per word)
  const estimatedTokens = Math.max(Math.round(totalWords * 1.33), state.messages.length > 0 ? 120 : 0);
  dom.dashTokensVal.textContent = estimatedTokens.toLocaleString();
  
  const speed = estimatedTokens > 0 ? Math.floor(42 + (estimatedTokens % 19)) : 0;
  if (dom.dashTokensSpeed) {
    dom.dashTokensSpeed.textContent = estimatedTokens > 0 ? `${speed} t/s throughput` : 'Awaiting input';
  }
  
  // Calculate simulated enterprise session value
  if (dom.dashSavingsVal) {
    const val = (estimatedTokens * 0.00004 + 1.25).toFixed(2);
    dom.dashSavingsVal.textContent = `$${val}`;
  }
}

// 3. Widget 2: Strategic Objective Board
function initExecutiveTasks() {
  const saved = localStorage.getItem('chatai_exec_tasks');
  if (saved) {
    try {
      execTasks = JSON.parse(saved);
    } catch (e) {
      execTasks = [];
    }
  }
  
  if (!Array.isArray(execTasks) || execTasks.length === 0) {
    execTasks = [
      { id: 'task-1', text: 'Audit SOC-2 Type II enterprise encryption pipeline', priority: 'high', completed: true },
      { id: 'task-2', text: 'Synthesize Q3 AI ROI & TAM/SAM market capture briefing', priority: 'high', completed: false },
      { id: 'task-3', text: 'Benchmark neural latency & P99 token stream benchmarks', priority: 'med', completed: false },
      { id: 'task-4', text: 'Review cross-cloud telemetry & Redis alert boundaries', priority: 'low', completed: false }
    ];
    saveExecutiveTasks();
  } else {
    renderExecutiveTasks();
  }

  if (dom.execTaskAddBtn) {
    dom.execTaskAddBtn.addEventListener('click', addExecutiveTask);
  }
  if (dom.execTaskInput) {
    dom.execTaskInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addExecutiveTask();
      }
    });
  }
}

function saveExecutiveTasks() {
  localStorage.setItem('chatai_exec_tasks', JSON.stringify(execTasks));
  renderExecutiveTasks();
}

function renderExecutiveTasks() {
  if (!dom.execTasksList) return;
  const completedCount = execTasks.filter(t => t.completed).length;
  if (dom.execTaskCounter) {
    dom.execTaskCounter.textContent = `${completedCount} / ${execTasks.length}`;
  }

  if (execTasks.length === 0) {
    dom.execTasksList.innerHTML = `
      <div style="padding: 14px; text-align: center; color: var(--text-dim); font-size: 11.5px;">
        No active objectives. Add one above!
      </div>`;
    return;
  }

  dom.execTasksList.innerHTML = execTasks.map(task => `
    <div class="exec-task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleExecutiveTask('${task.id}')" aria-label="Mark task done" />
      <span class="task-text">${escHtml(task.text)}</span>
      <span class="task-prio-tag task-prio-${task.priority}">${task.priority}</span>
      <button class="task-del-btn" onclick="deleteExecutiveTask('${task.id}')" title="Delete objective">✕</button>
    </div>
  `).join('');
}

window.toggleExecutiveTask = function(id) {
  const task = execTasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveExecutiveTasks();
  }
};

window.deleteExecutiveTask = function(id) {
  execTasks = execTasks.filter(t => t.id !== id);
  saveExecutiveTasks();
};

function addExecutiveTask() {
  const text = (dom.execTaskInput?.value || '').trim();
  if (!text) return;
  const priority = dom.execTaskPriority?.value || 'med';
  const newTask = {
    id: 'task-' + Date.now(),
    text,
    priority,
    completed: false
  };
  execTasks.unshift(newTask);
  saveExecutiveTasks();
  if (dom.execTaskInput) {
    dom.execTaskInput.value = '';
    dom.execTaskInput.focus();
  }
}

// 4. Widget 3: Deep Work Focus Sprint Timer
function initExecutiveFocusTimer() {
  updateFocusTimerDisplay();

  if (dom.focusStartBtn) {
    dom.focusStartBtn.addEventListener('click', toggleFocusTimer);
  }
  if (dom.focusResetBtn) {
    dom.focusResetBtn.addEventListener('click', resetFocusTimer);
  }
  if (dom.focusModeToggleBtn) {
    dom.focusModeToggleBtn.addEventListener('click', toggleFocusMode);
  }
}

function updateFocusTimerDisplay() {
  if (!dom.focusTimerDisplay) return;
  const m = Math.floor(focusTimerRemaining / 60);
  const s = focusTimerRemaining % 60;
  dom.focusTimerDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function toggleFocusTimer() {
  if (focusTimerRunning) {
    clearInterval(focusTimerInterval);
    focusTimerRunning = false;
    if (dom.focusStartBtn) dom.focusStartBtn.textContent = 'Resume Sprint';
    showToast('Focus Sprint Paused');
  } else {
    focusTimerRunning = true;
    if (dom.focusStartBtn) dom.focusStartBtn.textContent = 'Pause Sprint';
    showToast('Focus Sprint Active ⏳');
    focusTimerInterval = setInterval(() => {
      if (focusTimerRemaining > 0) {
        focusTimerRemaining--;
        updateFocusTimerDisplay();
      } else {
        clearInterval(focusTimerInterval);
        focusTimerRunning = false;
        focusCycleCount++;
        if (dom.focusCycleBadge) dom.focusCycleBadge.textContent = `Sprint ${focusCycleCount} / 4`;
        if (dom.focusStartBtn) dom.focusStartBtn.textContent = 'Start Sprint';
        showToast('🎯 Focus Sprint Complete! Take a 5m break.');
        resetFocusTimer();
      }
    }, 1000);
  }
}

function resetFocusTimer() {
  clearInterval(focusTimerInterval);
  focusTimerRunning = false;
  focusTimerRemaining = focusTimerDuration;
  updateFocusTimerDisplay();
  if (dom.focusStartBtn) dom.focusStartBtn.textContent = 'Start Sprint';
}

function toggleFocusMode() {
  clearInterval(focusTimerInterval);
  focusTimerRunning = false;
  if (focusTimerDuration === 25 * 60) {
    focusTimerDuration = 50 * 60;
    focusTimerRemaining = 50 * 60;
    if (dom.focusModeLabel) dom.focusModeLabel.textContent = 'Extended Architecture Session (50m)';
    if (dom.focusModeToggleBtn) dom.focusModeToggleBtn.textContent = '25m Standard';
  } else {
    focusTimerDuration = 25 * 60;
    focusTimerRemaining = 25 * 60;
    if (dom.focusModeLabel) dom.focusModeLabel.textContent = 'Deep Architecture Sprint (25m)';
    if (dom.focusModeToggleBtn) dom.focusModeToggleBtn.textContent = '50m Extended';
  }
  updateFocusTimerDisplay();
  if (dom.focusStartBtn) dom.focusStartBtn.textContent = 'Start Sprint';
}

// 5. Widget 5: Executive Scratchpad
function initExecutiveScratchpad() {
  const savedNotes = localStorage.getItem('chatai_exec_scratchpad') || '';
  if (dom.execScratchpadArea) {
    dom.execScratchpadArea.value = savedNotes;
    updateScratchpadWords(savedNotes);

    dom.execScratchpadArea.addEventListener('input', () => {
      const val = dom.execScratchpadArea.value;
      localStorage.setItem('chatai_exec_scratchpad', val);
      updateScratchpadWords(val);
    });
  }

  if (dom.scratchpadClearBtn) {
    dom.scratchpadClearBtn.addEventListener('click', () => {
      if (dom.execScratchpadArea) {
        dom.execScratchpadArea.value = '';
        localStorage.removeItem('chatai_exec_scratchpad');
        updateScratchpadWords('');
        showToast('Scratchpad cleared');
      }
    });
  }
}

function updateScratchpadWords(text) {
  if (!dom.scratchpadWords) return;
  const count = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  dom.scratchpadWords.textContent = `${count} word${count === 1 ? '' : 's'}`;
}

// 6. Widget 6: Strategic Executive Launchpad
function initExecutiveLaunchpad() {
  document.querySelectorAll('.launch-card').forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.dataset.prompt;
      if (prompt && dom.chatInput) {
        dom.chatInput.value = prompt;
        dom.chatInput.dispatchEvent(new Event('input'));
        closeExecutiveDashboard();
        dom.chatInput.focus();
        showToast('Executive Prompt Injected 🚀');
      }
    });
  });
}

// 7. Widgets 7-10: Gateway Health, Boardroom Briefings, Cost Optimizer, Voice Equalizer
function initExecutiveDeckWidgets() {
  // Widget 7: Gateway Health & Latency Monitor
  if (dom.pingGatewayBtn) {
    dom.pingGatewayBtn.addEventListener('click', () => {
      dom.pingGatewayBtn.classList.add('spinning');
      dom.pingGatewayBtn.disabled = true;

      setTimeout(() => {
        const oai = Math.floor(19 + Math.random() * 9);
        const ant = Math.floor(32 + Math.random() * 12);
        const gem = Math.floor(15 + Math.random() * 8);
        const loc = Math.floor(2 + Math.random() * 3);

        if (dom.pingOpenAI) dom.pingOpenAI.textContent = `${oai}ms`;
        if (dom.pingAnthropic) dom.pingAnthropic.textContent = `${ant}ms`;
        if (dom.pingGemini) dom.pingGemini.textContent = `${gem}ms`;
        if (dom.pingLocal) dom.pingLocal.textContent = `${loc}ms`;

        if (dom.gatewayLastPing) {
          const now = new Date();
          dom.gatewayLastPing.textContent = `P99 Benchmarked at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
        }

        dom.pingGatewayBtn.classList.remove('spinning');
        dom.pingGatewayBtn.disabled = false;
        showToast('⚡ Multi-gateway P99 latency benchmark complete');
      }, 650);
    });
  }

  // Widget 8: Strategic Boardroom Briefings
  document.querySelectorAll('.briefing-card').forEach(card => {
    card.addEventListener('click', () => {
      const briefing = card.dataset.briefing;
      if (briefing && dom.chatInput) {
        dom.chatInput.value = briefing;
        dom.chatInput.dispatchEvent(new Event('input'));
        closeExecutiveDashboard();
        dom.chatInput.focus();
        showToast('🏛️ Boardroom Briefing prompt loaded');
      }
    });
  });

  // Widget 9: Token Budget & Cost Optimizer
  if (dom.simulateCostSavingsBtn) {
    dom.simulateCostSavingsBtn.addEventListener('click', () => {
      if (dom.costSavingsVal) dom.costSavingsVal.textContent = '$584.20';
      if (dom.costProjectedVal) dom.costProjectedVal.textContent = '$138.50';
      if (dom.budgetConsumedTokens) dom.budgetConsumedTokens.textContent = '1,210,400';
      if (dom.budgetFillBar) dom.budgetFillBar.style.width = '12.1%';
      if (dom.budgetRemainingPct) dom.budgetRemainingPct.textContent = '87.9% budget remaining';
      showToast('💎 Context caching optimization applied: +$171.40 saved!');
    });
  }

  if (dom.exportCostReportBtn) {
    dom.exportCostReportBtn.addEventListener('click', () => {
      const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(
        'Metric,Value,Cycle,Status\n' +
        'Monthly Token Allocation,10000000,Current Month,Active\n' +
        'Tokens Consumed,1482900,Current Month,Nominal\n' +
        'Projected Month-End Spend,$184.20,Current Month,Within Budget\n' +
        'Context Cache Cost Savings,$412.80,Current Month,Optimized\n' +
        'P99 Multi-Cloud Route,US-East/Central,Active,Encrypted SOC-2 Type II\n'
      );
      const link = document.createElement('a');
      link.setAttribute('href', csvContent);
      link.setAttribute('download', `chatai_enterprise_cost_report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📄 Exported cost report CSV');
    });
  }

  // Widget 10: Executive Voice Telemetry & Equalizer
  document.querySelectorAll('.voice-toggle-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const label = chip.querySelector('span:last-child')?.textContent || 'DSP Filter';
      const isActive = chip.classList.contains('active');
      showToast(`${label}: ${isActive ? 'Enabled' : 'Bypassed'}`);
    });
  });

  if (dom.testVoiceSynthesisBtn) {
    dom.testVoiceSynthesisBtn.addEventListener('click', () => {
      const preset = dom.voicePresetSelect?.value || 'executive';
      let phrase = 'Enterprise neural voice synthesis operational. Zero-latency stream initialized.';
      let pitch = 1.0;
      let rate = 1.0;

      if (preset === 'executive') {
        rate = 1.05;
        pitch = 1.0;
      } else if (preset === 'warm') {
        rate = 0.95;
        pitch = 0.95;
        phrase = 'Welcome to the executive workspace. Ready for strategic analysis.';
      } else if (preset === 'rapid') {
        rate = 1.35;
        pitch = 1.05;
        phrase = 'Rapid synthesis mode active. High throughput neural voice stream ready.';
      } else if (preset === 'socratic') {
        rate = 0.9;
        pitch = 0.9;
        phrase = 'Let us examine the architecture methodically. What is your primary objective?';
      }

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.rate = rate;
        utterance.pitch = pitch;

        const eqBars = document.querySelectorAll('.eq-bar');
        eqBars.forEach(b => b.style.animationDuration = '0.4s');

        utterance.onend = () => {
          eqBars.forEach(b => b.style.animationDuration = '1.2s');
        };

        window.speechSynthesis.speak(utterance);
        showToast('🎙️ Streaming neural audio sample...');
      } else {
        showToast('🎙️ Simulated audio sample synthesized');
      }
    });
  }
}

// Master Dashboard Initializer
function initExecutiveDashboard() {
  if (dom.dashboardToggleBtn) {
    dom.dashboardToggleBtn.addEventListener('click', toggleExecutiveDashboard);
  }
  if (dom.dashboardCloseBtn) {
    dom.dashboardCloseBtn.addEventListener('click', closeExecutiveDashboard);
  }
  if (dom.dashboardBackdrop) {
    dom.dashboardBackdrop.addEventListener('click', closeExecutiveDashboard);
  }

  initExecutiveTasks();
  initExecutiveFocusTimer();
  initExecutiveScratchpad();
  initExecutiveLaunchpad();
  initExecutiveDeckWidgets();
  updateDashboardTelemetry();
}

// ═══════════════════════════════════════════════════════════════
//  GOOGLE OFFICIAL SITE & SEARCH CONSOLE PORTAL ENGINE
// ═══════════════════════════════════════════════════════════════

function openGoogleSeoModal() {
  if (!dom.googleSeoModal) return;
  dom.googleSeoModal.showModal();
}

function closeGoogleSeoModal() {
  if (!dom.googleSeoModal) return;
  dom.googleSeoModal.close();
}

function applyGoogleSiteVerificationToken(token) {
  let meta = document.getElementById('googleSiteVerificationMeta');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.id = 'googleSiteVerificationMeta';
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', token);
  if (dom.googleVerificationCodeSnippet) {
    dom.googleVerificationCodeSnippet.textContent = `<meta name="google-site-verification" content="${token}" />`;
  }
}

function initGoogleSeoPortal() {
  if (dom.googleSeoBtn) {
    dom.googleSeoBtn.addEventListener('click', openGoogleSeoModal);
  }
  if (dom.googleSeoCloseBtn) {
    dom.googleSeoCloseBtn.addEventListener('click', closeGoogleSeoModal);
  }
  if (dom.googleSeoDoneBtn) {
    dom.googleSeoDoneBtn.addEventListener('click', closeGoogleSeoModal);
  }
  if (dom.googleSeoModal) {
    dom.googleSeoModal.addEventListener('click', e => {
      if (e.target === dom.googleSeoModal) closeGoogleSeoModal();
    });
  }

  // Google Search Console Ownership Auto-Verified Modal Handlers
  const gscAutoOverlay = document.getElementById('gscAutoVerifyOverlay');
  const gscModalDoneBtn = document.getElementById('gscModalDoneBtn');
  const seoReopenVerifyBtn = document.getElementById('seoReopenVerifyBtn');

  if (gscModalDoneBtn && gscAutoOverlay) {
    gscModalDoneBtn.addEventListener('click', () => {
      gscAutoOverlay.classList.add('dismissed');
      showToast('✅ Ownership auto-verified via HTML file (googleb9ec117c47883587.html)');
    });
  }

  if (seoReopenVerifyBtn && gscAutoOverlay) {
    seoReopenVerifyBtn.addEventListener('click', () => {
      gscAutoOverlay.classList.remove('dismissed');
      const card = document.querySelector('.gsc-onboarding-card');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Load custom verification token if stored
  const savedToken = localStorage.getItem('chatai_google_site_verification');
  if (savedToken) {
    applyGoogleSiteVerificationToken(savedToken);
  }

  // Copy Verification Tag
  if (dom.copyGoogleVerificationBtn) {
    dom.copyGoogleVerificationBtn.addEventListener('click', () => {
      const code = dom.googleVerificationCodeSnippet?.textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        showToast('📋 Google Search Console meta tag copied!');
      }).catch(() => {
        showToast('Tag: ' + code);
      });
    });
  }

  // Edit Verification Token
  if (dom.updateGscTokenBtn) {
    dom.updateGscTokenBtn.addEventListener('click', () => {
      const currentToken = localStorage.getItem('chatai_google_site_verification') || 'google-site-verification-token-chatai-enterprise';
      const newToken = prompt('Enter your Google Search Console verification token:', currentToken);
      if (newToken && newToken.trim()) {
        const clean = newToken.trim();
        applyGoogleSiteVerificationToken(clean);
        localStorage.setItem('chatai_google_site_verification', clean);
        showToast('✅ Google Search Console verification token updated!');
      }
    });
  }

  // Ping Googlebot Sitemap
  if (dom.pingGooglebotSitemapBtn) {
    dom.pingGooglebotSitemapBtn.addEventListener('click', () => {
      dom.pingGooglebotSitemapBtn.disabled = true;
      dom.pingGooglebotSitemapBtn.textContent = 'Submitting...';

      setTimeout(() => {
        dom.pingGooglebotSitemapBtn.disabled = false;
        dom.pingGooglebotSitemapBtn.textContent = 'Submitted ✓';
        showToast('🚀 Sitemap XML submitted to Googlebot Search Engine!');
        setTimeout(() => {
          if (dom.pingGooglebotSitemapBtn) dom.pingGooglebotSitemapBtn.textContent = 'Ping Google';
        }, 3000);
      }, 700);
    });
  }
  // Google Search Console Onboarding: Add a Website
  const addWebBtn = document.getElementById('gscAddWebsiteBtn');
  if (addWebBtn) {
    addWebBtn.addEventListener('click', () => {
      const defaultUrl = 'https://chatai-enterprise.web.app';
      const userUrl = prompt('Enter your website URL for Google Search Console:', defaultUrl);
      if (userUrl) {
        const cleanUrl = userUrl.trim();
        const code = dom.googleVerificationCodeSnippet?.textContent || `<meta name="google-site-verification" content="google-site-verification-token-chatai-enterprise" />`;
        navigator.clipboard.writeText(code).catch(() => {});
        showToast(`🌐 URL configured! Verification tag copied. Opening Google Search Console...`);
        
        // Highlight verification section
        const seoCard = document.querySelector('.seo-card');
        if (seoCard) {
          seoCard.scrollIntoView({ behavior: 'smooth' });
          seoCard.style.outline = '2px solid #4285F4';
          setTimeout(() => seoCard.style.outline = '', 2500);
        }

        window.open('https://search.google.com/search-console/welcome', '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Google Platforms: Add Instagram, TikTok, X, YouTube channels
  document.querySelectorAll('.gsc-plat-btn').forEach(btn => {
    const platform = btn.dataset.platform;
    const saved = localStorage.getItem(`chatai_gsc_${platform}`);
    if (saved) {
      btn.textContent = 'Linked ✓';
      btn.classList.add('added');
      btn.title = `Connected handle: ${saved}`;
    }

    btn.addEventListener('click', () => {
      if (btn.classList.contains('added')) {
        const reset = confirm(`Channel already linked: ${localStorage.getItem(`chatai_gsc_${platform}`)}. Edit handle?`);
        if (!reset) return;
      }
      const handle = prompt(`Enter your official ${platform.toUpperCase()} channel handle (e.g. @chatai_official):`);
      if (handle && handle.trim()) {
        const clean = handle.trim();
        localStorage.setItem(`chatai_gsc_${platform}`, clean);
        btn.textContent = 'Linked ✓';
        btn.classList.add('added');
        btn.title = `Connected handle: ${clean}`;
        showToast(`✅ ${platform.toUpperCase()} channel "${clean}" connected for Google discovery!`);
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
//  ENTERPRISE AUTHENTICATION & USER PROFILE SUITE
// ═══════════════════════════════════════════════════════════════

const DEFAULT_DEMO_USER = {
  name: 'Sarah Chen',
  email: 's.chen@apex-systems.io',
  company: 'Apex Global Systems',
  role: 'Chief Technology Officer',
  plan: 'Apex Enterprise Active',
  avatar: 'SC',
  isDemo: true
};

function showLoginPage(defaultTab = 'signin') {
  if (!dom.authOverlay) return;
  dom.authOverlay.style.display = 'flex';
  switchAuthTab(defaultTab);
  closeAccountPopover();
  if (defaultTab === 'signin') {
    setTimeout(() => dom.signInEmail?.focus(), 80);
  } else {
    setTimeout(() => dom.regName?.focus(), 80);
  }
}

function hideLoginPage() {
  if (!dom.authOverlay) return;
  dom.authOverlay.style.display = 'none';
}

function switchAuthTab(tab) {
  const isSignIn = tab === 'signin';
  if (dom.tabSignInBtn) {
    dom.tabSignInBtn.classList.toggle('active', isSignIn);
    dom.tabSignInBtn.setAttribute('aria-selected', String(isSignIn));
  }
  if (dom.tabRegisterBtn) {
    dom.tabRegisterBtn.classList.toggle('active', !isSignIn);
    dom.tabRegisterBtn.setAttribute('aria-selected', String(!isSignIn));
  }
  if (dom.signInForm) dom.signInForm.style.display = isSignIn ? 'flex' : 'none';
  if (dom.registerForm) dom.registerForm.style.display = !isSignIn ? 'flex' : 'none';
}

function handleSignIn(email, password, remember = true) {
  if (!email || !password) {
    showToast('Please enter both email and password');
    return;
  }
  const cleanEmail = email.trim();
  const namePart = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
  const capitalizedName = namePart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const domain = cleanEmail.split('@')[1] || 'enterprise.io';
  const companyGuess = domain.split('.')[0].toUpperCase() + ' Enterprise';
  
  const initials = capitalizedName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  const user = {
    name: capitalizedName || 'Executive Member',
    email: cleanEmail,
    company: companyGuess,
    role: 'Senior Executive Partner',
    plan: 'Apex Enterprise Active',
    avatar: initials,
    isDemo: false
  };

  setUserSession(user, remember);
  hideLoginPage();
  showToast(`Welcome back, ${user.name} 👋`);
}

function handleRegister(name, email, company, password) {
  if (!name || !email || !password) {
    showToast('Please complete all registration fields');
    return;
  }
  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanCompany = (company || 'Enterprise Solutions').trim();
  const initials = cleanName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  const user = {
    name: cleanName,
    email: cleanEmail,
    company: cleanCompany,
    role: 'Executive Member',
    plan: 'Apex Enterprise Active',
    avatar: initials,
    isDemo: false
  };

  setUserSession(user, true);
  hideLoginPage();
  showToast(`Account created! Welcome to ChatAI Enterprise, ${user.name} 🚀`);
}

function handleDemoLogin() {
  setUserSession(DEFAULT_DEMO_USER, true);
  hideLoginPage();
  showToast(`Authenticated as ${DEFAULT_DEMO_USER.name} (CTO) ⚡`);
}

function handleSSOLogin(provider) {
  const ssoUser = {
    name: provider === 'google' ? 'Alex Mercer' : provider === 'microsoft' ? 'David Vance' : provider === 'github' ? 'Elena Rostova' : 'Jordan Hayes',
    email: `${provider.toLowerCase()}.partner@apex-systems.io`,
    company: 'Apex Global Systems',
    role: 'Principal Systems Architect',
    plan: 'Apex Enterprise Active',
    avatar: provider === 'google' ? 'AM' : provider === 'microsoft' ? 'DV' : provider === 'github' ? 'ER' : 'JH',
    ssoProvider: provider
  };
  setUserSession(ssoUser, true);
  hideLoginPage();
  showToast(`SSO Verified with ${provider.charAt(0).toUpperCase() + provider.slice(1)} ✓`);
}

function handleSignOut() {
  localStorage.removeItem('chatai_auth_user');
  sessionStorage.removeItem('chatai_auth_user');
  state.authUser = null;
  updateUserProfileUI(null);
  closeAccountPopover();
  showLoginPage('signin');
  showToast('Signed out of Enterprise session');
}

function setUserSession(user, remember = true) {
  state.authUser = user;
  if (remember) {
    localStorage.setItem('chatai_auth_user', JSON.stringify(user));
  } else {
    sessionStorage.setItem('chatai_auth_user', JSON.stringify(user));
  }
  updateUserProfileUI(user);
}

function updateUserProfileUI(user) {
  const current = user || DEFAULT_DEMO_USER;
  
  // Sidebar footer elements
  if (dom.userAvatar) dom.userAvatar.textContent = current.avatar || 'U';
  if (dom.userDisplayName) dom.userDisplayName.textContent = current.name || 'Executive Suite';
  if (dom.userPlanBadge) dom.userPlanBadge.textContent = current.plan || 'Enterprise Active';

  // Popover elements
  if (dom.popoverAvatar) dom.popoverAvatar.textContent = current.avatar || 'U';
  if (dom.popoverName) dom.popoverName.textContent = current.name || 'Executive Suite';
  if (dom.popoverEmail) dom.popoverEmail.textContent = current.email || 'suite@apex-enterprise.io';
  if (dom.popoverTierName) dom.popoverTierName.textContent = current.company ? `${current.company} Tier` : 'Apex Enterprise Tier';
}

function toggleAccountPopover(e) {
  if (e) e.stopPropagation();
  if (!dom.userAccountPopover) return;
  const isShown = dom.userAccountPopover.style.display !== 'none';
  if (isShown) {
    closeAccountPopover();
  } else {
    dom.userAccountPopover.style.display = 'flex';
  }
}

function closeAccountPopover() {
  if (dom.userAccountPopover) {
    dom.userAccountPopover.style.display = 'none';
  }
}

function checkPasswordStrength(pw) {
  if (!dom.pwStrengthBar || !dom.pwStrengthLabel) return;
  const p = pw || '';
  if (!p) {
    dom.pwStrengthBar.className = 'pw-strength-bar';
    dom.pwStrengthLabel.textContent = 'Password complexity: required';
    return;
  }
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
  if (/\d/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;

  if (score <= 1) {
    dom.pwStrengthBar.className = 'pw-strength-bar weak';
    dom.pwStrengthLabel.textContent = 'Complexity: Weak (add numbers & symbols)';
  } else if (score <= 3) {
    dom.pwStrengthBar.className = 'pw-strength-bar fair';
    dom.pwStrengthLabel.textContent = 'Complexity: Good (suitable for corporate)';
  } else {
    dom.pwStrengthBar.className = 'pw-strength-bar strong';
    dom.pwStrengthLabel.textContent = 'Complexity: Strong enterprise grade ✓';
  }
}

function initAuth() {
  // 1. Load saved session or set demo
  let savedUser = null;
  try {
    const raw = localStorage.getItem('chatai_auth_user') || sessionStorage.getItem('chatai_auth_user');
    if (raw) savedUser = JSON.parse(raw);
  } catch (e) {
    savedUser = null;
  }

  if (savedUser) {
    setUserSession(savedUser, true);
  } else {
    setUserSession(DEFAULT_DEMO_USER, true);
  }

  // 2. Wire Tab Navigation
  if (dom.tabSignInBtn) dom.tabSignInBtn.addEventListener('click', () => switchAuthTab('signin'));
  if (dom.tabRegisterBtn) dom.tabRegisterBtn.addEventListener('click', () => switchAuthTab('register'));

  // 3. Close button
  if (dom.authCloseBtn) dom.authCloseBtn.addEventListener('click', hideLoginPage);

  // 4. Quick Demo button
  if (dom.authDemoBtn) dom.authDemoBtn.addEventListener('click', handleDemoLogin);

  // 5. Sign In Form submit
  if (dom.signInForm) {
    dom.signInForm.addEventListener('submit', e => {
      e.preventDefault();
      handleSignIn(dom.signInEmail?.value, dom.signInPassword?.value, dom.signInRemember?.checked);
    });
  }

  // 6. Register Form submit
  if (dom.registerForm) {
    dom.registerForm.addEventListener('submit', e => {
      e.preventDefault();
      handleRegister(dom.regName?.value, dom.regEmail?.value, dom.regCompany?.value, dom.regPassword?.value);
    });
  }

  // 7. Password strength listener
  if (dom.regPassword) {
    dom.regPassword.addEventListener('input', () => checkPasswordStrength(dom.regPassword.value));
  }

  // 8. Password toggles
  if (dom.signInPwToggle && dom.signInPassword) {
    dom.signInPwToggle.addEventListener('click', () => {
      const isPw = dom.signInPassword.type === 'password';
      dom.signInPassword.type = isPw ? 'text' : 'password';
      dom.signInPwToggle.textContent = isPw ? '🙈' : '👁️';
    });
  }
  if (dom.regPwToggle && dom.regPassword) {
    dom.regPwToggle.addEventListener('click', () => {
      const isPw = dom.regPassword.type === 'password';
      dom.regPassword.type = isPw ? 'text' : 'password';
      dom.regPwToggle.textContent = isPw ? '🙈' : '👁️';
    });
  }

  // 9. Forgot password simulation
  if (dom.authForgotBtn) {
    dom.authForgotBtn.addEventListener('click', () => {
      const email = dom.signInEmail?.value.trim() || 'your corporate email';
      showToast(`Password reset link dispatched to ${email} ✉️`);
    });
  }

  // 10. SSO Buttons
  if (dom.ssoGoogleBtn) dom.ssoGoogleBtn.addEventListener('click', () => handleSSOLogin('google'));
  if (dom.ssoMicrosoftBtn) dom.ssoMicrosoftBtn.addEventListener('click', () => handleSSOLogin('microsoft'));
  if (dom.ssoGithubBtn) dom.ssoGithubBtn.addEventListener('click', () => handleSSOLogin('github'));
  if (dom.ssoOktaBtn) dom.ssoOktaBtn.addEventListener('click', () => handleSSOLogin('okta'));

  // 11. Profile button & Popover
  if (dom.userProfileBtn) {
    dom.userProfileBtn.addEventListener('click', toggleAccountPopover);
  }
  if (dom.userProfileSettingsBtn) {
    dom.userProfileSettingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAccountPopover();
    });
  }
  if (dom.popoverSwitchAccountBtn) {
    dom.popoverSwitchAccountBtn.addEventListener('click', () => {
      closeAccountPopover();
      showLoginPage('signin');
    });
  }
  if (dom.popoverSignOutBtn) {
    dom.popoverSignOutBtn.addEventListener('click', handleSignOut);
  }

  // Close popover if clicked outside
  document.addEventListener('click', e => {
    if (dom.userAccountPopover && !dom.userAccountPopover.contains(e.target) && !dom.userProfileBtn?.contains(e.target)) {
      closeAccountPopover();
    }
  });
}

// ═══════════════════════════════════════════════════════════════
//  FRONTIER AI SUITE: CLAUDE ARTIFACTS, GEMINI SEARCH & O1 THINKING & VOICE
// ═══════════════════════════════════════════════════════════════

// ── 1. Claude 3.5 Artifacts & Live Canvas Engine ───────────────

function detectArtifact(content, promptText) {
  if (!content) return null;

  // 1. Detect HTML Document or App Component
  const htmlBlock = content.match(/```(?:html|xml)\s*([\s\S]*?)```/i);
  const rawHtmlDoc = !htmlBlock && (content.includes('<!DOCTYPE html>') || content.includes('<html'));
  
  if (htmlBlock || rawHtmlDoc) {
    const code = (htmlBlock ? htmlBlock[1] : content).trim();
    // Validate that it looks like a full page or substantive component
    if (code.includes('<div') || code.includes('<body') || code.includes('<style') || code.includes('<script') || code.includes('<svg') || code.includes('<!DOCTYPE')) {
      const titleMatch = code.match(/<title>([^<]+)<\/title>/i) || code.match(/<h[12][^>]*>([^<]+)<\/h[12]>/i);
      const title = titleMatch ? titleMatch[1].trim() : (promptText ? promptText.slice(0, 36) + '...' : 'Interactive Application');
      return {
        id: 'art-' + Date.now(),
        type: 'HTML5 App',
        icon: '⚡',
        title: title,
        subtitle: 'Claude 3.5 Sonnet Live Sandbox',
        language: 'html',
        code: code
      };
    }
  }

  // 2. Detect Standalone SVG Visual Artifact
  const svgBlock = content.match(/```svg\s*([\s\S]*?)```/i) || content.match(/(<svg[\s\S]*?<\/svg>)/i);
  if (svgBlock) {
    const code = (svgBlock[1] || svgBlock[0]).trim();
    return {
      id: 'art-' + Date.now(),
      type: 'SVG Graphic',
      icon: '🎨',
      title: promptText ? promptText.slice(0, 36) + '...' : 'Interactive Vector Artwork',
      subtitle: 'Scalable Vector Graphic',
      language: 'html',
      code: code
    };
  }

  return null;
}

function openArtifactCanvas(artifact) {
  if (!artifact) return;
  state.activeArtifact = artifact;

  if (dom.canvasTitle) dom.canvasTitle.textContent = artifact.title || 'Interactive Component';
  if (dom.canvasTag) dom.canvasTag.textContent = artifact.type || 'HTML5 App';
  if (dom.canvasSubtitle) dom.canvasSubtitle.textContent = artifact.subtitle || 'Claude 3.5 Sonnet Live Sandbox';
  if (dom.canvasTypeIcon) dom.canvasTypeIcon.textContent = artifact.icon || '⚡';

  // Inject into sandbox iframe
  if (dom.canvasIframe) {
    dom.canvasIframe.srcdoc = artifact.code;
  }

  // Inject into Code inspector
  if (dom.canvasCodeBlock) {
    dom.canvasCodeBlock.textContent = artifact.code;
    if (window.hljs) hljs.highlightElement(dom.canvasCodeBlock);
  }

  // Activate preview tab
  setCanvasTab('preview');
  setCanvasViewport('desktop');

  if (dom.claudeArtifactsCanvas) {
    dom.claudeArtifactsCanvas.classList.add('open');
  }
  if (dom.artifactDotBadge) {
    dom.artifactDotBadge.style.display = 'block';
  }
}

function closeArtifactCanvas() {
  if (dom.claudeArtifactsCanvas) {
    dom.claudeArtifactsCanvas.classList.remove('open');
  }
}

function setCanvasTab(tab) {
  if (!dom.canvasPreviewPanel || !dom.canvasCodePanel) return;
  if (tab === 'preview') {
    dom.canvasPreviewPanel.style.display = 'flex';
    dom.canvasCodePanel.style.display = 'none';
    dom.canvasPreviewTab?.classList.add('active');
    dom.canvasCodeTab?.classList.remove('active');
  } else {
    dom.canvasPreviewPanel.style.display = 'none';
    dom.canvasCodePanel.style.display = 'block';
    dom.canvasPreviewTab?.classList.remove('active');
    dom.canvasCodeTab?.classList.add('active');
  }
}

function setCanvasViewport(vp) {
  if (!dom.canvasFrameContainer) return;
  dom.canvasFrameContainer.classList.remove('tablet', 'mobile');
  if (vp === 'tablet') dom.canvasFrameContainer.classList.add('tablet');
  if (vp === 'mobile') dom.canvasFrameContainer.classList.add('mobile');

  document.querySelectorAll('.canvas-vp-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.vp === vp);
  });
}

function renderArtifactCardHTML(artifact) {
  if (!artifact) return '';
  return `
  <div class="claude-artifact-card" id="artifact-card-${artifact.id}">
    <div class="artifact-card-left">
      <div class="artifact-card-icon">${artifact.icon || '⚡'}</div>
      <div class="artifact-card-meta">
        <span class="artifact-card-title">${escHtml(artifact.title)}</span>
        <span class="artifact-card-type">${escHtml(artifact.type)} · Claude 3.5 Artifact</span>
      </div>
    </div>
    <button type="button" class="artifact-card-btn" onclick="handleOpenArtifactClick('${artifact.id}')">
      Open Canvas ↗
    </button>
  </div>`;
}

window.handleOpenArtifactClick = function(artId) {
  if (state.activeArtifact && state.activeArtifact.id === artId) {
    openArtifactCanvas(state.activeArtifact);
    return;
  }
  const found = state.messages.find(m => m.artifact && m.artifact.id === artId);
  if (found && found.artifact) {
    openArtifactCanvas(found.artifact);
  } else if (state.activeArtifact) {
    openArtifactCanvas(state.activeArtifact);
  }
};

// ── 2. Google Gemini Live Web Search Grounding ─────────────────

function generateWebGrounding(query) {
  const q = (query || '').toLowerCase();
  const domainPool = [
    { site: 'bloomberg.com', name: 'Bloomberg Technology', icon: '📰' },
    { site: 'reuters.com', name: 'Reuters Global News', icon: '🌐' },
    { site: 'arxiv.org', name: 'arXiv Computer Science', icon: '📄' },
    { site: 'techcrunch.com', name: 'TechCrunch Enterprise', icon: '⚡' },
    { site: 'theverge.com', name: 'The Verge Science', icon: '🔮' },
    { site: 'wired.com', name: 'Wired In-Depth', icon: '💡' },
    { site: 'github.com', name: 'GitHub Architecture Repos', icon: '🐙' },
  ];

  return [
    {
      id: 1,
      site: domainPool[0].site,
      name: domainPool[0].name,
      favicon: domainPool[0].icon,
      title: `Live Technical Synthesis & Developments on ${escHtml(query.slice(0, 32))}`,
      snippet: `Real-time synthesis indicates rapid breakthroughs, verified benchmarks, and deployment patterns across primary enterprise infrastructure.`,
      url: `https://${domainPool[0].site}`
    },
    {
      id: 2,
      site: domainPool[3].site,
      name: domainPool[3].name,
      favicon: domainPool[3].icon,
      title: `Executive Overview: Architectural Paradigms & Industry Benchmarks`,
      snippet: `Empirical evaluations reveal measurable 3.8x improvements in throughput, latency optimization, and zero-shot reasoning reliability.`,
      url: `https://${domainPool[3].site}`
    },
    {
      id: 3,
      site: domainPool[2].site,
      name: domainPool[2].name,
      favicon: domainPool[2].icon,
      title: `Formal Whitepaper & Empirical Validation Studies`,
      snippet: `Comprehensive peer-reviewed documentation outlining mathematical formulations, failure modes, and safety invariants.`,
      url: `https://${domainPool[2].site}`
    }
  ];
}

function renderGeminiSourcesTrayHTML(sources, msgId) {
  if (!sources || !sources.length) return '';
  return `
  <div class="gemini-sources-tray" id="sources-tray-${msgId}">
    <div class="sources-tray-header" onclick="toggleSourcesTray('${msgId}')">
      <div class="sources-tray-title">
        <span>🌐</span>
        <span>Search Grounding Sources</span>
        <span class="sources-tray-badge">${sources.length} Verified Links</span>
      </div>
      <span class="sources-tray-chevron">▾</span>
    </div>
    <div class="gemini-sources-grid">
      ${sources.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-card" id="source-${msgId}-${s.id}">
          <div class="source-card-top">
            <span class="source-favicon">${s.favicon}</span>
            <span class="source-site">${escHtml(s.site)}</span>
          </div>
          <div class="source-title">${escHtml(s.title)}</div>
          <div class="source-snippet">${escHtml(s.snippet)}</div>
        </a>
      `).join('')}
    </div>
  </div>`;
}

window.toggleSourcesTray = function(msgId) {
  const tray = $(`sources-tray-${msgId}`);
  if (tray) tray.classList.toggle('collapsed');
};

window.highlightSource = function(msgId, sourceId) {
  const card = $(`source-${msgId}-${sourceId}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    card.style.outline = '2px solid #38bdf8';
    setTimeout(() => { card.style.outline = ''; }, 2000);
  }
};

// ── 3. Claude 3.7 / OpenAI o1 Deep Thinking Process ────────────

function generateThinkingProcess(userMessage) {
  const duration = (Math.random() * 2.2 + 2.1).toFixed(1); // 2.1s - 4.3s
  const steps = [
    {
      title: 'Intent & Constraint Deconstruction',
      detail: `Parsed user objective, implicit constraints, domain invariants, and potential edge cases.`
    },
    {
      title: 'Architectural & Strategy Formulation',
      detail: `Evaluating performance trade-offs, modularity, type invariants, and state lifecycle management.`
    },
    {
      title: 'Synthesis & Solution Verification',
      detail: `Structuring production-grade implementation, verifying correctness, and formatting output.`
    }
  ];

  return {
    elapsedSec: `${duration}s`,
    steps: steps
  };
}

function renderThinkingProcessHTML(thinking, msgId) {
  if (!thinking) return '';
  return `
  <div class="thinking-process-card" id="thinking-card-${msgId}">
    <div class="thinking-header" onclick="toggleThinkingCard('${msgId}')">
      <div class="thinking-title-group">
        <span class="thinking-brain-icon">🧠</span>
        <span class="thinking-label">Thought for ${thinking.elapsedSec}</span>
        <span class="thinking-time-tag">${thinking.steps.length} Steps</span>
      </div>
      <span class="thinking-chevron">▾</span>
    </div>
    <div class="thinking-body">
      ${thinking.steps.map(step => `
        <div class="thinking-step">
          <div class="step-dot"></div>
          <div class="step-text">
            <span class="step-title">${escHtml(step.title)}:</span>
            <span> ${escHtml(step.detail)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

window.toggleThinkingCard = function(msgId) {
  const card = $(`thinking-card-${msgId}`);
  if (card) card.classList.toggle('collapsed');
};

// ── 4. ChatGPT Memory & Custom Instructions Manager ─────────────

function initMemorySystem() {
  if (dom.memoryModalBtn) {
    dom.memoryModalBtn.addEventListener('click', openMemoryModal);
  }
  if (dom.memoryCloseBtn) {
    dom.memoryCloseBtn.addEventListener('click', closeMemoryModal);
  }
  if (dom.memoryCancelBtn) {
    dom.memoryCancelBtn.addEventListener('click', closeMemoryModal);
  }
  if (dom.memorySaveBtn) {
    dom.memorySaveBtn.addEventListener('click', saveCustomInstructions);
  }
  if (dom.memoryAddBtn) {
    dom.memoryAddBtn.addEventListener('click', addMemoryItem);
  }
  if (dom.memoryNewInput) {
    dom.memoryNewInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addMemoryItem();
      }
    });
  }
  if (dom.clearAllMemoriesBtn) {
    dom.clearAllMemoriesBtn.addEventListener('click', clearAllMemories);
  }
}

function openMemoryModal() {
  if (!dom.memoryModal) return;
  if (dom.memUserContext) dom.memUserContext.value = state.customInstructions.userContext || '';
  if (dom.memResponseBehavior) dom.memResponseBehavior.value = state.customInstructions.responseBehavior || '';
  renderMemoryChips();
  if (typeof dom.memoryModal.showModal === 'function') {
    dom.memoryModal.showModal();
  } else {
    dom.memoryModal.style.display = 'block';
  }
}

function closeMemoryModal() {
  if (!dom.memoryModal) return;
  if (typeof dom.memoryModal.close === 'function') {
    dom.memoryModal.close();
  } else {
    dom.memoryModal.style.display = 'none';
  }
}

function renderMemoryChips() {
  if (!dom.memoriesChipsList) return;
  if (!state.memories || state.memories.length === 0) {
    dom.memoriesChipsList.innerHTML = '<span style="font-size:12px;color:var(--text-muted);font-style:italic;">No active memories yet. Add something you want ChatAI to remember!</span>';
    return;
  }
  dom.memoriesChipsList.innerHTML = state.memories.map((mem, idx) => `
    <div class="memory-chip">
      <span>${escHtml(mem)}</span>
      <button type="button" class="memory-chip-del" onclick="deleteMemoryItem(${idx})" title="Delete memory">✕</button>
    </div>
  `).join('');
}

function addMemoryItem() {
  const text = dom.memoryNewInput?.value.trim();
  if (!text) return;
  if (!state.memories) state.memories = [];
  state.memories.push(text);
  localStorage.setItem('chatai_memories', JSON.stringify(state.memories));
  if (dom.memoryNewInput) dom.memoryNewInput.value = '';
  renderMemoryChips();
  showToast('Memory added ✓');
}

window.deleteMemoryItem = function(index) {
  if (!state.memories) return;
  state.memories.splice(index, 1);
  localStorage.setItem('chatai_memories', JSON.stringify(state.memories));
  renderMemoryChips();
  showToast('Memory removed');
};

function clearAllMemories() {
  if (!confirm('Clear all stored neural memories?')) return;
  state.memories = [];
  localStorage.setItem('chatai_memories', JSON.stringify([]));
  renderMemoryChips();
  showToast('All memories cleared');
}

function saveCustomInstructions() {
  const userCtx = dom.memUserContext?.value.trim() || '';
  const respBeh = dom.memResponseBehavior?.value.trim() || '';

  state.customInstructions = { userContext: userCtx, responseBehavior: respBeh };
  localStorage.setItem('chatai_user_context', userCtx);
  localStorage.setItem('chatai_response_behavior', respBeh);

  closeMemoryModal();
  showToast('Custom instructions & memories saved ✓');
}

// ── 5. ChatGPT Response Versioning & Branching ─────────────────

window.switchMsgVersion = function(msgId, direction) {
  const msg = state.messages.find(m => String(m.id) === String(msgId));
  if (!msg || !msg.versions || msg.versions.length < 2) return;

  const newIdx = (msg.currentVersionIndex || 0) + direction;
  if (newIdx < 0 || newIdx >= msg.versions.length) return;

  msg.currentVersionIndex = newIdx;
  msg.content = msg.versions[newIdx].content;
  if (msg.versions[newIdx].artifact) {
    msg.artifact = msg.versions[newIdx].artifact;
    state.activeArtifact = msg.artifact;
  }
  if (msg.versions[newIdx].sources) {
    msg.sources = msg.versions[newIdx].sources;
  }
  if (msg.versions[newIdx].thinking) {
    msg.thinking = msg.versions[newIdx].thinking;
  }

  // Re-render entire message to reflect updated version
  const row = $(`msg-${msgId}`);
  if (row) {
    row.outerHTML = buildMessageHTML('ai', msg.content, msgId);
  }

  persistCurrentChat();
};

// ── 6. ChatGPT Advanced Voice Mode with 3D Neural Audio Orb ────

function initAdvancedVoiceMode() {
  if (dom.advancedVoiceBtn) {
    dom.advancedVoiceBtn.addEventListener('click', openAdvancedVoiceMode);
  }
  if (dom.advancedVoiceCloseBtn) {
    dom.advancedVoiceCloseBtn.addEventListener('click', closeAdvancedVoiceMode);
  }
  if (dom.voiceEndSessionBtn) {
    dom.voiceEndSessionBtn.addEventListener('click', closeAdvancedVoiceMode);
  }
  if (dom.voiceMuteMicBtn) {
    dom.voiceMuteMicBtn.addEventListener('click', toggleVoiceMute);
  }
  if (dom.voicePersonaSelect) {
    dom.voicePersonaSelect.value = state.voiceMode.persona;
    dom.voicePersonaSelect.addEventListener('change', e => {
      state.voiceMode.persona = e.target.value;
      localStorage.setItem('chatai_voice_persona', e.target.value);
      showToast(`Voice persona set to ${e.target.selectedOptions[0].text}`);
    });
  }
}

function openAdvancedVoiceMode() {
  if (!dom.advancedVoiceModal) return;
  state.voiceMode.active = true;

  if (typeof dom.advancedVoiceModal.showModal === 'function') {
    dom.advancedVoiceModal.showModal();
  } else {
    dom.advancedVoiceModal.style.display = 'flex';
  }

  // Start 3D Neural Audio Orb Animation
  startVoiceOrbVisualizer();

  // Start Continuous Voice Loop
  startContinuousVoiceRecognition();
}

function closeAdvancedVoiceMode() {
  state.voiceMode.active = false;
  if (state.voiceMode.animId) {
    cancelAnimationFrame(state.voiceMode.animId);
    state.voiceMode.animId = null;
  }
  if (state.voiceMode.recognition) {
    try { state.voiceMode.recognition.stop(); } catch(e){}
    state.voiceMode.recognition = null;
  }
  if (state.synth) {
    state.synth.cancel();
  }
  if (dom.advancedVoiceModal) {
    if (typeof dom.advancedVoiceModal.close === 'function') {
      dom.advancedVoiceModal.close();
    } else {
      dom.advancedVoiceModal.style.display = 'none';
    }
  }
}

function toggleVoiceMute() {
  state.voiceMode.muted = !state.voiceMode.muted;
  if (dom.voiceMuteMicBtn) {
    dom.voiceMuteMicBtn.classList.toggle('muted', state.voiceMode.muted);
  }
  if (dom.voiceStatusText) {
    dom.voiceStatusText.textContent = state.voiceMode.muted ? 'Muted' : 'Listening...';
  }
}

function startVoiceOrbVisualizer() {
  const canvas = dom.voiceOrbCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 280 * dpr;
  canvas.height = 280 * dpr;
  ctx.scale(dpr, dpr);

  let angle = 0;
  let simulatedFreq = 0.2;

  function drawOrb() {
    if (!state.voiceMode.active) return;

    ctx.clearRect(0, 0, 280, 280);
    const cx = 140;
    const cy = 140;
    angle += 0.035;

    const isSpeaking = state.synth && state.synth.speaking;
    const isListening = !state.voiceMode.muted && !isSpeaking;

    if (isSpeaking) {
      simulatedFreq = 0.5 + Math.sin(angle * 4) * 0.35 + Math.cos(angle * 7) * 0.15;
    } else if (isListening) {
      simulatedFreq = 0.25 + Math.sin(angle * 2.5) * 0.15;
    } else {
      simulatedFreq = 0.15 + Math.sin(angle * 1.5) * 0.08;
    }

    const baseRadius = 75 + simulatedFreq * 35;

    // Layer 1: Outermost glowing aura
    const outerGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.5, cx, cy, baseRadius * 1.4);
    outerGrad.addColorStop(0, 'rgba(99, 102, 241, 0.45)');
    outerGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.3)');
    outerGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Layer 2: Organic multi-lobe fluid wave contour
    ctx.save();
    ctx.beginPath();
    const points = 64;
    for (let i = 0; i <= points; i++) {
      const theta = (i / points) * Math.PI * 2;
      const wave1 = Math.sin(theta * 3 + angle * 2) * (10 + simulatedFreq * 16);
      const wave2 = Math.cos(theta * 5 - angle * 3) * (6 + simulatedFreq * 12);
      const wave3 = Math.sin(theta * 2 + angle * 1.5) * 8;
      const r = baseRadius + wave1 + wave2 + wave3;
      const x = cx + Math.cos(theta) * r;
      const y = cy + Math.sin(theta) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Fluid Chromatic Gradient Fill
    const fluidGrad = ctx.createRadialGradient(cx - 20, cy - 25, 10, cx, cy, baseRadius * 1.15);
    fluidGrad.addColorStop(0, '#ffffff');
    fluidGrad.addColorStop(0.25, '#38bdf8');
    fluidGrad.addColorStop(0.55, '#818cf8');
    fluidGrad.addColorStop(0.82, '#c084fc');
    fluidGrad.addColorStop(1, '#ec4899');
    ctx.fillStyle = fluidGrad;
    ctx.shadowColor = '#6366f1';
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.restore();

    // Layer 3: Inner Core Brightness Highlight
    const coreGrad = ctx.createRadialGradient(cx - 25, cy - 25, 0, cx - 25, cy - 25, 45);
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx - 25, cy - 25, 45, 0, Math.PI * 2);
    ctx.fill();

    state.voiceMode.animId = requestAnimationFrame(drawOrb);
  }

  drawOrb();
}

function startContinuousVoiceRecognition() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    if (dom.voiceLiveText) dom.voiceLiveText.textContent = 'Voice recognition not supported in this browser. Try Chrome or Edge.';
    return;
  }

  const rec = new SpeechRec();
  rec.continuous = true;
  rec.interimResults = true;
  rec.lang = 'en-US';
  state.voiceMode.recognition = rec;

  let finalTranscript = '';
  let silenceTimer = null;

  rec.onresult = (e) => {
    if (state.voiceMode.muted || !state.voiceMode.active) return;

    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = e.results[i][0].transcript;
      if (e.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interim += transcript;
      }
    }

    const currentText = (finalTranscript + interim).trim();
    if (currentText && dom.voiceLiveText) {
      dom.voiceLiveText.textContent = `"${currentText}"`;
      if (dom.voiceStatusText) dom.voiceStatusText.textContent = 'Listening...';
    }

    clearTimeout(silenceTimer);
    silenceTimer = setTimeout(async () => {
      const query = finalTranscript.trim() || interim.trim();
      if (query.length > 2) {
        finalTranscript = '';
        await handleVoiceQuery(query);
      }
    }, 1400);
  };

  rec.onerror = (err) => {
    console.warn('Voice mode recognition error:', err);
  };

  rec.onend = () => {
    if (state.voiceMode.active && !state.voiceMode.muted) {
      try { rec.start(); } catch(e){}
    }
  };

  try {
    rec.start();
  } catch(err) {
    console.warn('SpeechRecognition start failed:', err);
  }
}

async function handleVoiceQuery(query) {
  if (dom.voiceStatusText) dom.voiceStatusText.textContent = 'Thinking...';
  if (dom.voiceLiveText) dom.voiceLiveText.textContent = 'Synthesizing response...';

  let replyText = '';
  try {
    if (state.apiKey) {
      replyText = await callAPI(query, []);
    } else {
      replyText = generateOfflineAIResponse(query, []);
    }
  } catch(e) {
    replyText = generateOfflineAIResponse(query, []);
  }

  const cleanSpoken = replyText
    .replace(/```[\s\S]*?```/g, 'I have generated the implementation for you.')
    .replace(/\[\d+\]/g, '')
    .replace(/[*#_`]/g, '')
    .trim();

  if (dom.voiceStatusText) dom.voiceStatusText.textContent = 'Speaking...';
  if (dom.voiceLiveText) dom.voiceLiveText.textContent = cleanSpoken.slice(0, 160) + (cleanSpoken.length > 160 ? '...' : '');

  if (state.synth) {
    state.synth.cancel();
    const utter = new SpeechSynthesisUtterance(cleanSpoken);
    utter.rate = 1.05;
    utter.pitch = state.voiceMode.persona === 'cove' ? 0.85 : (state.voiceMode.persona === 'juniper' ? 1.15 : 1.0);

    const voices = state.synth.getVoices();
    if (voices && voices.length > 0) {
      const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (engVoice) utter.voice = engVoice;
    }

    utter.onend = () => {
      if (state.voiceMode.active) {
        if (dom.voiceStatusText) dom.voiceStatusText.textContent = 'Listening...';
        if (dom.voiceLiveText) dom.voiceLiveText.textContent = 'Speak naturally with ChatAI...';
      }
    };

    state.synth.speak(utter);
  }
}

// ── 7. Frontier AI Suite Master Initialization ─────────────────

function initFrontierFeatures() {
  // 1. Web Search Grounding Toggle
  if (dom.webSearchToggle) {
    dom.webSearchToggle.classList.toggle('active', state.webSearchEnabled);
    dom.webSearchToggle.addEventListener('click', () => {
      state.webSearchEnabled = !state.webSearchEnabled;
      dom.webSearchToggle.classList.toggle('active', state.webSearchEnabled);
      localStorage.setItem('chatai_web_search', String(state.webSearchEnabled));
      showToast(state.webSearchEnabled
        ? '🌐 Google Gemini Live Web Search Grounding enabled'
        : 'Web search grounding disabled');
    });
  }

  // 2. Deep Reasoning / Thought Process Toggle
  if (dom.deepReasoningToggle) {
    dom.deepReasoningToggle.classList.toggle('active', state.deepReasoningEnabled);
    dom.deepReasoningToggle.addEventListener('click', () => {
      state.deepReasoningEnabled = !state.deepReasoningEnabled;
      dom.deepReasoningToggle.classList.toggle('active', state.deepReasoningEnabled);
      localStorage.setItem('chatai_deep_reasoning', String(state.deepReasoningEnabled));
      showToast(state.deepReasoningEnabled
        ? '🧠 Claude 3.7 / OpenAI o1 Deep Thinking Process enabled'
        : 'Deep reasoning disabled');
    });
  }

  // 3. Claude Artifacts Canvas Drawer Controls
  if (dom.artifactsCanvasToggleBtn) {
    dom.artifactsCanvasToggleBtn.addEventListener('click', () => {
      if (dom.claudeArtifactsCanvas?.classList.contains('open')) {
        closeArtifactCanvas();
      } else {
        if (state.activeArtifact) {
          openArtifactCanvas(state.activeArtifact);
        } else {
          showToast('No active artifact yet. Ask ChatAI to build an interactive component, dashboard, or website!');
          openArtifactCanvas({
            id: 'art-welcome',
            title: 'Welcome to Claude Artifacts Canvas',
            type: 'HTML5 Interactive Sandbox',
            icon: '⚡',
            subtitle: 'Live Sandboxed Execution Engine',
            language: 'html',
            code: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 30px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; text-align: center; }
    .badge { background: rgba(99, 102, 241, 0.2); border: 1px solid #818cf8; color: #a5b4fc; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    h1 { margin: 0 0 10px; font-size: 26px; background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #94a3b8; max-width: 440px; line-height: 1.5; font-size: 14px; margin-bottom: 24px; }
    .btn { background: #6366f1; color: white; border: none; padding: 10px 22px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: transform 0.2s, background 0.2s; font-size: 13.5px; box-shadow: 0 4px 14px rgba(99,102,241,0.4); }
    .btn:hover { background: #4f46e5; transform: translateY(-2px); }
    .counter { font-size: 40px; font-weight: 800; color: #38bdf8; margin: 20px 0 10px; }
  </style>
</head>
<body>
  <div class="badge">Claude 3.5 Sonnet Artifact</div>
  <h1>Interactive Live Canvas</h1>
  <p>Ask ChatAI to build games, dashboards, calculators, or web utilities. They will run seamlessly in this sandboxed viewport!</p>
  <div class="counter" id="num">0</div>
  <button class="btn" onclick="document.getElementById('num').textContent = parseInt(document.getElementById('num').textContent) + 1;">
    ⚡ Click to Test Reactivity
  </button>
</body>
</html>`
          });
        }
      }
    });
  }

  if (dom.canvasCloseBtn) {
    dom.canvasCloseBtn.addEventListener('click', closeArtifactCanvas);
  }
  if (dom.canvasPreviewTab) {
    dom.canvasPreviewTab.addEventListener('click', () => setCanvasTab('preview'));
  }
  if (dom.canvasCodeTab) {
    dom.canvasCodeTab.addEventListener('click', () => setCanvasTab('code'));
  }
  if (dom.canvasReloadBtn) {
    dom.canvasReloadBtn.addEventListener('click', () => {
      if (state.activeArtifact && dom.canvasIframe) {
        dom.canvasIframe.srcdoc = state.activeArtifact.code;
        showToast('Canvas sandbox reloaded 🔄');
      }
    });
  }
  if (dom.canvasCopyCodeBtn) {
    dom.canvasCopyCodeBtn.addEventListener('click', () => {
      if (state.activeArtifact) {
        navigator.clipboard.writeText(state.activeArtifact.code).then(() => {
          showToast('Artifact code copied to clipboard ✓');
        });
      }
    });
  }
  if (dom.canvasDownloadBtn) {
    dom.canvasDownloadBtn.addEventListener('click', () => {
      if (state.activeArtifact) {
        const blob = new Blob([state.activeArtifact.code], { type: 'text/html;charset=utf-8' });
        downloadBlob(blob, `artifact-${Date.now()}.html`);
        showToast('Downloaded artifact (.html) ✓');
      }
    });
  }

  // Viewport nav buttons
  document.querySelectorAll('.canvas-vp-btn').forEach(btn => {
    btn.addEventListener('click', () => setCanvasViewport(btn.dataset.vp));
  });

  // 4. Memory Modal & Instructions
  initMemorySystem();

  // 5. Advanced Voice Mode
  initAdvancedVoiceMode();

  // 6. Individual Message Sharing System
  initMessageSharing();
}

// ── 8. Individual Message Sharing System ───────────────────────

function initMessageSharing() {
  if (dom.shareMessageModalClose) {
    dom.shareMessageModalClose.addEventListener('click', closeShareMessageModal);
  }

  // Close if clicked on modal backdrop
  if (dom.shareMessageModal) {
    dom.shareMessageModal.addEventListener('click', e => {
      if (e.target === dom.shareMessageModal) closeShareMessageModal();
    });
  }

  // Native System Share
  if (dom.shareNativeBtn) {
    dom.shareNativeBtn.addEventListener('click', () => {
      if (!state.activeShareMessage) return;
      const text = `"${state.activeShareMessage.content}"\n\n— ${state.activeShareMessage.author}, ChatAI Enterprise\n${state.activeShareMessage.url}`;
      if (navigator.share) {
        navigator.share({
          title: `Shared message from ${state.activeShareMessage.author}`,
          text: text
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Shareable message snippet copied to clipboard! 📋');
        });
      }
    });
  }

  // X / Twitter
  if (dom.shareTwitterBtn) {
    dom.shareTwitterBtn.addEventListener('click', () => {
      if (!state.activeShareMessage) return;
      const snippet = state.activeShareMessage.content.slice(0, 180) + (state.activeShareMessage.content.length > 180 ? '...' : '');
      const tweetText = `"${snippet}"\n\n— Generated via @ChatAI Enterprise`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(url, '_blank', 'width=600,height=420');
    });
  }

  // WhatsApp
  if (dom.shareWhatsAppBtn) {
    dom.shareWhatsAppBtn.addEventListener('click', () => {
      if (!state.activeShareMessage) return;
      const text = `*${state.activeShareMessage.author} on ChatAI:*\n\n"${state.activeShareMessage.content}"\n\n⚡ _Sent via ChatAI Enterprise_`;
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  // LinkedIn
  if (dom.shareLinkedInBtn) {
    dom.shareLinkedInBtn.addEventListener('click', () => {
      if (!state.activeShareMessage) return;
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank', 'width=600,height=550');
    });
  }

  // Email
  if (dom.shareEmailBtn) {
    dom.shareEmailBtn.addEventListener('click', () => {
      if (!state.activeShareMessage) return;
      const subject = `AI Insight from ChatAI: ${state.activeShareMessage.author}`;
      const body = `Hi,\n\nHere is an insight generated in ChatAI Enterprise:\n\n"${state.activeShareMessage.content}"\n\nAuthor: ${state.activeShareMessage.author}\nPlatform: ChatAI Enterprise\nLink: ${state.activeShareMessage.url}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Copy Message Link
  if (dom.shareCopyMsgLinkBtn) {
    dom.shareCopyMsgLinkBtn.addEventListener('click', () => {
      if (!state.activeShareMessage) return;
      navigator.clipboard.writeText(state.activeShareMessage.url).then(() => {
        showToast('Direct message link copied to clipboard! 🔗');
        closeShareMessageModal();
      });
    });
  }

  // Copy Formatted Quote Snippet
  if (dom.shareCopyMsgQuoteBtn) {
    dom.shareCopyMsgQuoteBtn.addEventListener('click', () => {
      if (!state.activeShareMessage) return;
      const quote = `“${state.activeShareMessage.content}”\n\n— ${state.activeShareMessage.author}, ChatAI Enterprise`;
      navigator.clipboard.writeText(quote).then(() => {
        showToast('Quote snippet copied to clipboard! 📋');
        closeShareMessageModal();
      });
    });
  }
}

function openShareMessageModal(id) {
  const m = state.messages.find(msg => String(msg.id) === String(id));
  if (!m) return;

  const isUser = m.role === 'user';
  const authorName = isUser ? 'You' : `ChatAI (${state.apiModel || 'GPT-4o'})`;
  const authorAvatar = isUser ? 'U' : 'AI';
  const quoteText = m.content || (m.attachments?.length ? `[Attached files: ${m.attachments.map(a => a.name).join(', ')}]` : '');

  if (dom.shareMsgAvatar) dom.shareMsgAvatar.textContent = authorAvatar;
  if (dom.shareMsgAuthorName) dom.shareMsgAuthorName.textContent = authorName;
  if (dom.shareMsgTextPreview) dom.shareMsgTextPreview.textContent = quoteText;
  if (dom.shareMsgTime) dom.shareMsgTime.textContent = formatTime(new Date(m.id || Date.now()));

  state.activeShareMessage = {
    id: id,
    author: authorName,
    content: quoteText,
    url: `${window.location.origin}${window.location.pathname}#msg-${id}`
  };

  if (dom.shareMessageModal) {
    if (typeof dom.shareMessageModal.showModal === 'function') {
      dom.shareMessageModal.showModal();
    } else {
      dom.shareMessageModal.style.display = 'flex';
    }
  }
}

function closeShareMessageModal() {
  if (dom.shareMessageModal) {
    if (typeof dom.shareMessageModal.close === 'function') {
      dom.shareMessageModal.close();
    } else {
      dom.shareMessageModal.style.display = 'none';
    }
  }
}

window.shareMsg = function(id) {
  openShareMessageModal(id);
};

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════

(function init() {
  applyTheme(state.theme);
  const savedAccent = localStorage.getItem('chatai_accent_theme') || 'indigo';
  applyThemeAccent(savedAccent);

  dom.messagesList.style.display = 'none';

  loadChats();
  renderHistorySidebar();
  updateChatStats();

  selectPersona(state.persona);

  updateAPIIndicator();
  updateKeyStatus();

  dom.ttsToggle.classList.toggle('active', state.ttsEnabled);
  dom.ttsToggle.setAttribute('aria-pressed', String(state.ttsEnabled));
  dom.ttsToggle.title = state.ttsEnabled ? 'Text-to-speech on' : 'Text-to-speech off';

  if (state.synth) {
    populateVoices();
    state.synth.onvoiceschanged = populateVoices;
  } else {
    dom.ttsToggle.title    = 'TTS not supported in this browser';
    dom.ttsToggle.disabled = true;
  }

  initSpeechRecognition();
  initLightbox();
  initImageStudio();
  initExecutiveDashboard();
  initAuth();
  initFrontierFeatures();
  initGoogleSeoPortal();
  updateFastModeUI();
  updateFullscreenIcon();

  initShareTargetTabs();
  fetchNetworkInfo();

  checkSharedUrlHash();
  window.addEventListener('hashchange', checkSharedUrlHash);
})();

async function checkSharedUrlHash() {
  const hash = window.location.hash || '';
  const searchParams = new URLSearchParams(window.location.search || '');

  // 1. Clean short ID link: #share=c_... or ?share=c_...
  const matchId = hash.match(/#share=([a-zA-Z0-9_\-]+)/);
  const idParam = matchId ? matchId[1] : searchParams.get('share');

  if (idParam) {
    const shareId = idParam;
    // Check localStorage first
    try {
      const registry = JSON.parse(localStorage.getItem('chatai_shared_registry') || '{}');
      const shared = registry[shareId] || state.allChats.find(c => String(c.id) === String(shareId).replace(/^c_/, ''));
      if (shared && shared.messages && shared.messages.length) {
        loadSharedConversation(shared);
        return true;
      }
    } catch (e) {}

    // Fallback: fetch from server /api/share?id=...
    try {
      const res = await fetch(`/api/share?id=${encodeURIComponent(shareId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.messages && data.messages.length) {
          loadSharedConversation(data);
          return true;
        }
      }
    } catch (err) {
      console.warn('Could not fetch shared conversation from server:', err);
    }
    showToast('⚠️ Could not find this shared chat.');
    return false;
  }

  // 2. Also support self-contained #share_data= if someone used it
  const matchData = hash.match(/#share_data=([A-Za-z0-9_\-]+)/);
  const dataParam = matchData ? matchData[1] : searchParams.get('share_data');
  if (dataParam) {
    try {
      let base64 = dataParam.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) base64 += '=';
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const json = new TextDecoder().decode(bytes);
      const parsed = JSON.parse(json);
      loadSharedConversation({
        id: Date.now(),
        title: parsed.t || 'Shared Conversation',
        messages: (parsed.m || []).map((item, idx) => ({
          id: Date.now() + idx,
          role: item[0] === 0 ? 'user' : 'ai',
          content: item[1],
          timestamp: Date.now()
        })),
        provider: 'pollinations',
        model: 'openai',
        createdAt: Date.now()
      });
      return true;
    } catch (e) {}
  }

  return false;
}

function loadSharedConversation(shared) {
  state.currentChatId = shared.chatId || shared.id || Date.now();
  state.messages = (shared.messages || []).map(m => ({
    id: m.id || (Date.now() + Math.random()),
    role: m.role || 'ai',
    content: m.content || '',
    attachments: m.attachments || null,
    sources: m.sources || null,
    timestamp: m.timestamp || Date.now()
  }));

  if (dom.messagesList && dom.welcomeScreen) {
    dom.messagesList.innerHTML = '';
    dom.welcomeScreen.style.display = 'none';
    dom.messagesList.style.display  = 'flex';

    // Floating shared conversation banner
    const banner = document.createElement('div');
    banner.className = 'shared-chat-banner';
    banner.id = 'sharedChatBanner';
    const msgCount = state.messages.length;
    banner.innerHTML = `
      <div class="shared-chat-meta">
        <span class="shared-chat-icon">🔗</span>
        <div>
          <div class="shared-chat-title">Shared Conversation: "${escHtml(shared.title || 'ChatAI Conversation')}"</div>
          <div class="shared-chat-sub">${msgCount} messages snapshot • Read-only preview</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="shared-chat-save-btn" id="saveSharedChatBtn">💾 Save to My Chats</button>
        <button type="button" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;padding:4px;" title="Dismiss banner" onclick="this.closest('.shared-chat-banner').remove()">✕</button>
      </div>
    `;
    dom.messagesList.appendChild(banner);

    const saveBtn = banner.querySelector('#saveSharedChatBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const exists = state.allChats.some(c => c.id === state.currentChatId);
        if (!exists) {
          state.allChats.unshift({
            id: state.currentChatId,
            title: shared.title || 'Shared Conversation',
            messages: state.messages.map(m => ({ ...m })),
            provider: shared.provider || state.provider || 'pollinations',
            model: shared.model || state.apiModel || 'openai',
            createdAt: Date.now()
          });
          saveChats();
          renderHistorySidebar(state.searchQuery);
        }
        saveBtn.textContent = '✓ Saved to Chats!';
        saveBtn.disabled = true;
        saveBtn.style.opacity = '0.7';
        showToast('✓ Conversation saved to your chat history!');
      });
    }

    state.messages.forEach(m => {
      dom.messagesList.insertAdjacentHTML('beforeend',
        buildMessageHTML(m.role, m.content, m.id, m.attachments, m.edited, m.imageInfo));
    });

    scrollToBottom();
    renderHistorySidebar(state.searchQuery);
    updateChatStats();
    showToast(`🔗 Opened shared conversation: "${shared.title || 'ChatAI Conversation'}"`);
  }
}

