# Project: PDF Generation with Puppeteer

This project is a Node.js application for generating PDFs using the `html-pdf-node` package. It leverages Puppeteer to render HTML content into PDFs, with Chromium as the underlying browser engine. On local environments, it runs without any errors, but on cloud platforms like Azure it may throw some errors. It is because underlying Linux OS provided by cloud platforms (e.g. Azure) probably misses some required dependencies to handle Puppeteer, and Chromium browser running inside Puppeteer. There are several workarounds to avoid such errors.

---

## Error and Solutions

### Error:
When running the application on cloud platforms like Azure, you might encounter the following errors:

```
2024-11-21T10:39:05.892776712Z 10:39:05 0|server | server is running on 3000
2024-11-21T10:46:46.688896179Z 10:46:46 0|server | You have triggered an unhandledRejection, you may have forgotten to catch a Promise rejection:
2024-11-21T10:46:46.689217482Z 10:46:46 0|server | Error: Failed to launch the browser process!
2024-11-21T10:46:46.689223983Z 10:46:46 0|server | /node_modules/html-pdf-node/node_modules/puppeteer/.local-chromium/linux-901912/chrome-linux/chrome: error while loading shared libraries: libgobject-2.0.so.0: cannot open shared object file: No such file or directory
2024-11-21T10:46:46.689227683Z 10:46:46 0|server | TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
```

Even if you manage to install above dependencies, it may still throw the below error:
```
Error: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (901912).
    at ChromeLauncher.launch (/node_modules/html-pdf-node/node_modules/puppeteer/lib/cjs/puppeteer/node/Launcher.js:88:27)
    at async Object.generatePdf (/node_modules/html-pdf-node/index.js:17:19)
    at async /usr/src/app/app.js:26:27
```

This error occurs because Puppeteer cannot find the necessary Chromium binary to render PDFs.

---

## Solutions

### Solution 1: Using a `startup.sh` Script
If you are deploying the app in an environment where dependencies are installed at runtime, you can fix this error by automating the Chromium installation in a `startup.sh` script.

#### Steps:
1. Create a `startup.sh` file in your project root.
2. Add the required content to `startup.sh`: you can find it in project files.
3. Ensure the script is executable:

```bash
chmod +x startup.sh
```

4. Update your application startup command to execute the script, e.g.:

```bash
./startup.sh
```
On Azure App Services, you can navigate to Application > Configuration > Startup Command and add above command.

#### Notes: 
You can also include `node node_modules/puppeteer/install.mjs` into your pipeline configuration if you are using CI/CD, so it will be only executed once during the build time.
This task should be executed after running "npm install" task.

### Solution 2: Using a Dockerfile
You can include all the necessary dependencies and Chromium installation in your `Dockerfile` so everything is set up during the image build process. It will provide more stability and faster startup time since it will only install dependencies once when building the image.

#### Steps:
1. Use the `Dockerfile` from project files.

2. Build the Docker image:

```bash
docker build -t pdf-generator-app .
```

3. Run the Docker container:

```bash
docker run -p 3000:3000 pdf-generator-app
```

---

## Recommendation
Using a `Dockerfile` is the preferred solution for production environments because it ensures a consistent and reproducible build process. The `startup.sh` script can be useful for simpler setups or environments where you cannot modify the build process.

