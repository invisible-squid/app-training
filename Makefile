PROJECTNAME = vite-test
YARN := yarn
CARGO := cargo

############## FUNCTION DEFINES ##############


define yarn_install
	$(YARN) install
	cd dev-tools && $(YARN) install
endef

define dev_start
  $(YARN) tauri dev
endef

define dev_lint
  $(YARN) run lint
endef

define vite_build
	vue-tsc --noEmit && vite build
endef

define tauri_build
	$(YARN) run tauri build
endef

define debug_build
	$(YARN) run tauri build -d
endef

define vue_devtools
	cd dev-tools && $(YARN) run dev
endef

define update_tauri
  $(YARN) install vue-cli-plugin-tauri@latest
	$(YARN) install -s @tauri-apps/api@latest
	$(YARN) install @tauri-apps/cli@latest
endef

define dev_inspect
  $(YARN) run inspect
endef

define clean
	rm -rf node_modules
	rm -rf dist/**.*
	rm -rf src-tauri/target
	rm -rf dev-tools/node_modules
endef

############## MAKE COMMANDS ##############

PHONY: all
all: depends


# https://tauri.studio/en/docs/usage/development/updating
PHONY: update
update:
	$(call update_tauri)


PHONY: depends
depends:
	$(call yarn_install)

PHONY: devtools
devtools:
	$(call vue_devtools)

PHONY: dev
dev:
	make -j 2 devtools run

PHONY: run
run:
	$(call dev_start)

PHONY: build-vite
build-vite: depends
	$(call vite_build)

PHONY: build-tauri
build: depends
	$(call tauri_build)


PHONY: build-debug
build-debug: depends
	$(call debug_build)
	

PHONY: lint
lint:
	$(call dev_lint)

PHONY: inspect
inspect:
	$(call dev_inspect)

PHONY: clean-all
clean-all:
	$(call clean)