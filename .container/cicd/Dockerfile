FROM ubuntu:22.04

ARG DENO_VERSION=1.38.4
ARG DENO_INSTALL_DIR=/opt/deno
ARG DENO_INSTALL_SH=https://gist.githubusercontent.com/LukeChannings/09d53f5c364391042186518c8598b85e/raw/ac8cd8c675b985edd4b3e16df63ffef14d1f0e24/deno_install.sh
# REF: https://github.com/LukeChannings/deno-arm64

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    unzip \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL $DENO_INSTALL_SH | DENO_INSTALL=$DENO_INSTALL_DIR sh -s v$DENO_VERSION
ENV PATH $PATH:$DENO_INSTALL_DIR/bin

WORKDIR /workspace

RUN useradd -u 1001 -m nonroot && chown nonroot:nonroot -R /workspace
# WA: https://github.com/actions/runner/issues/2411

USER nonroot