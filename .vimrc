"
" raphael chang
" use on vim 7.4
"

set nocompatible
let fresh_install=0
let vundle_readme=expand('~/.vim/bundle/Vundle.vim/README.md')
if !filereadable(vundle_readme)
    echo "Installing Vundle.."
    echo ""
    silent !mkdir -p ~/.vim/bundle
    silent !git clone https://github.com/VundleVim/Vundle.vim ~/.vim/bundle/Vundle.vim
    let fresh_install=1
endif

set nocompatible
set encoding=utf-8
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'gmarik/Vundle.vim'
Plugin 'easymotion/vim-easymotion'
Plugin 'tpope/vim-surround'
Plugin 'christoomey/vim-tmux-navigator'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'itchyny/lightline.vim'
Plugin 'flazz/vim-colorschemes'
Plugin 'valloric/MatchTagAlways'
Plugin 'scrooloose/nerdcommenter'
Plugin 'scrooloose/nerdtree'
Plugin 'Xuyuanp/nerdtree-git-plugin'
Plugin 'tiagofumo/vim-nerdtree-syntax-highlight'
Plugin 'vim-scripts/indentpython.vim'
Plugin 'scrooloose/syntastic'
Plugin 'nvie/vim-flake8'
Plugin 'chreekat/vim-paren-crosshairs'
Plugin 'tpope/vim-fugitive'
Plugin 'airblade/vim-gitgutter'
Plugin 'a.vim'
Plugin 'andrewradev/undoquit.vim'

if fresh_install == 1
    PluginInstall
endif
call vundle#end()

filetype plugin indent on
syntax on
set showcmd
set autoread
set expandtab
set autoindent
set smartindent
set shiftwidth=4
set softtabstop=4
set whichwrap+=<,>,[,]
set wildmode=longest,list,full
set wildmenu
set backspace=2
set history=35
set modeline
set laststatus=2
set hlsearch
set autochdir
set updatetime=250
set tags=tags;/

au InsertEnter * set cursorline
au InsertLeave * set nocursorline
au InsertEnter * set cursorcolumn
au InsertLeave * set nocursorcolumn
set background=dark
if $TERM == "xterm-256color" || $TERM == "screen-256color" || $COLORTERM == "gnome-terminal" || $TERM == "screen"
    set t_Co=256
    colorscheme molokai
    hi LineNr ctermfg=250 ctermbg=234
    hi CursorLineNr cterm=bold ctermfg=232 ctermbg=250
    hi Visual cterm=bold ctermbg=238
    hi TrailingWhitespace ctermbg=52
else
    set t_Co=16
    set foldcolumn=1
    hi FoldColumn ctermbg=7
    hi LineNr cterm=bold ctermfg=0 ctermbg=0
    hi CursorLineNr ctermfg=0 ctermbg=7
    hi Visual cterm=bold ctermbg=8
    hi TrailingWhitespace ctermbg=1
endif
hi VertSplit ctermfg=0 ctermbg=0
au InsertLeave * set relativenumber
match TrailingWhitespace /\s\+$/

nnoremap tl :tabnext<CR>
nnoremap th :tabprev<CR>
"nnoremap th :tabfirst<CR>
"nnoremap tl :tablast<CR>
nnoremap t1 :tabn 1<CR>
nnoremap t2 :tabn 2<CR>
nnoremap t3 :tabn 3<CR>
nnoremap t4 :tabn 4<CR>
nnoremap t5 :tabn 5<CR>
nnoremap t6 :tabn 6<CR>
nnoremap t7 :tabn 7<CR>
nnoremap t8 :tabn 8<CR>
nnoremap t9 :tabn 9<CR>
nnoremap <silent> rn :exec &nu==&rnu? "se nu!" : "se rnu!"<CR>
nnoremap <C-_> :call NERDComment(0,"toggle")<CR>
vnoremap <C-_> :call NERDComment(0,"toggle")<CR>
inoremap <expr> j ((pumvisible())?("\<C-n>"):("j"))
inoremap <expr> k ((pumvisible())?("\<C-p>"):("k"))

set winheight=20
set winwidth=50
set winminheight=3
set winminwidth=10
set splitbelow
set splitright
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
map <silent> <Up> :exe "resize -5"<CR>
map <silent> <Down> :exe "resize +5"<CR>
map <silent> <Right> :exe "vert resize +5"<CR>
map <silent> <Left> :exe "vert resize -5"<CR>
nnoremap <silent> <Esc> :noh<Return><Esc>
nnoremap <silent> <ESC>^[A <Nop>
nnoremap <silent> <ESC>^[B <Nop>
nnoremap <silent> <ESC>^[D <Nop>
nnoremap <silent> <ESC>^[C <Nop>
nnoremap <C-S> :w<CR>
nnoremap <Nul> :AV<CR>
nnoremap <C-W>q :quit<CR>
inoremap <Nul> <C-N>
inoremap <c-h> <Esc>ha
inoremap <c-j> <Esc>ja
inoremap <c-k> <Esc>ka
inoremap <c-l> <Esc>la
nnoremap <C-A> ggVG
nnoremap <C-M> :make \| copen<CR>
nnoremap <C-M>u :make upload \| copen<CR>
nnoremap <C-M>c :make clean \| copen<CR>
nmap <C-N> :NERDTreeToggle<CR>
nnoremap <Leader>p :set invpaste<Return>

augroup reload_vimrc " {
    autocmd!
    autocmd BufWritePost $MYVIMRC source $MYVIMRC
augroup END " }

autocmd BufEnter * call system("tmux rename-window " . expand("%:t"))
autocmd VimLeave * call system("tmux rename-window bash")
autocmd BufEnter * let &titlestring = ' ' . expand("%:t")
set title

autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
let g:NERDTreeIndicatorMapCustom = {
    \ "Modified"  : "✹",
    \ "Staged"    : "✚",
    \ "Untracked" : "✭",
    \ "Renamed"   : "➜",
    \ "Unmerged"  : "═",
    \ "Deleted"   : "✖",
    \ "Dirty"     : "✗",
    \ "Clean"     : "✔︎",
    \ "Unknown"   : "?"
    \ }

let g:NERDTreeFileExtensionHighlightFullName = 1
let g:NERDTreeExtensionHighlightColor = {}
let g:NERDTreeExtensionHighlightColor['c'] = '00FFFF'
let g:NERDTreeExtensionHighlightColor['h'] = '00AAFF'
let g:NERDTreeExtensionHighlightColor['py'] = '00FF00'
let g:NERDTreeExtensionHighlightColor['pyc'] = '00AA00'
let g:NERDTreeExtensionHighlightColor['yml'] = 'FFFF00'
let g:NERDTreeExtensionHighlightColor['xml'] = 'FFFF00'
let g:NERDTreeExtensionHighlightColor['html'] = 'FFFF00'
let g:NERDTreeExtensionHighlightColor['js'] = '22DDFF'
let g:NERDTreeExtensionHighlightColor['json'] = '0099FF'
let g:NERDTreeExtensionHighlightColor['php'] = 'FF7700'

let g:lightline = {
  \ 'colorscheme': 'wombat',
  \ }

if has("cscope")
    set cscopetag
    set csto=0
    if filereadable("cscope.out")
        cs add cscope.out
    elseif $CSCOPE_DB != ""
        cs add $CSCOPE_DB
    endif
set cscopeverbose
endif
set csre
nmap <C-\>s :tab scs find s <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>g :tab scs find g <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>c :tab scs find c <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>t :tab scs find t <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>e :tab scs find e <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>f :tab scs find f <C-R>=expand("<cfile>")<CR><CR>
nmap <C-\>i :tab scs find i ^<C-R>=expand("<cfile>")<CR>$<CR>
nmap <C-\>d :tab scs find d <C-R>=expand("<cword>")<CR><CR>

set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 2
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_loc_list_height=5
let g:syntastic_python_checkers=['python', 'flake8']

set number
set relativenumber

function! s:insert_guards()
    let gatename = "_" . substitute(toupper(expand("%:t")), "\\.", "_", "g") . "_"
    execute "normal! i#ifndef " . gatename
    execute "normal! o#define " . gatename
    execute "normal! Go#endif /* " . gatename . " */"
    normal! kk
endfunction

autocmd BufNewFile *.{h,hpp} call <SID>insert_guards()

function! s:DiffWithSaved()
    let filetype=&ft
    diffthis
    vnew | r # | normal! 1Gdd
    diffthis
    exe "setlocal bt=nofile bh=wipe nobl noswf ro ft=" . filetype
endfunction
com! DiffSaved call s:DiffWithSaved()
