@echo off
echo create diary
SET today="%date:~0,4%%date:~5,2%%date:~8,2%"
SET diaryFile="source/_posts/%today%.md"
echo try to create %diaryFile%
if exist %diaryFile% (
    echo %diaryFile% exist!&&echo open %diaryFile% with VSCode!&&code "%diaryFile%"
) else (
    echo %diaryFile% not exist!
    echo create %diaryFile%!
    hexo new diary "%today%"&&echo open %diaryFile% with VSCode!&&code "%diaryFile%"
)