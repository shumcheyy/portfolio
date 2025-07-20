@echo off
echo  Cleaning and building portfolio...
echo.

echo 1. Building React frontend...
npm run build

if %errorlevel% neq 0 (
    echo  Build failed!
    exit /b 1
)

echo 2. Cleaning Go server public folder...
if exist go-server\public (
    rmdir /s /q go-server\public
)

echo 3. Copying fresh build files...
xcopy dist\public go-server\public /E /I /Y

if %errorlevel% neq 0 (
    echo  Copy failed!
    exit /b 1
)

echo.
echo ✅ Clean deployment complete!
echo.
echo Files in go-server/public:
dir go-server\public\assets
echo.
echo To run the Go server:
echo   cd go-server
echo   go run main.go
echo.
echo Then visit: http://localhost:10000