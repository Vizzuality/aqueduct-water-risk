# Building and running server in development

  * copy .env.sample to .env

  * get values from another developer

  * run it

    ```
    docker-compose up web
    ```

# Deploying

  Maybe something like this:

  * Clean out old builds

    ```
    rm -f dist/*
    ```

  * Build the app (dist directory)

    ```
    docker-compose run web yarn build
    ```

  * Copy the build to the main wri repo and push there to get it deployed via
    pantheon
