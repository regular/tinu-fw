set -e

source ~/.tisl/sdks/5.30.00.03.env
#export GCC_ARMCOMPILER=~/.tisl/packages/arm.gnu__9.2.1
RTOS=$TIRTOSNAME

COMPILER=gcc
# for old SDK versions, we need to make the kernel separately
# and patch $DEST/$NAME/tirtos/ccs/makefile"
[[ ${TISL_SDK##*_} = 5.30.00* ]] && \
  echo "Clean kernel ..." && \
  make -C kernel/$RTOS/builds/$BOARDNAME/release/$COMPILER clean && \
  sed -i -e 's/^KERNEL_BUILD\s*:=/KERNEL_BUILD ?=/' app/$RTOS/$COMPILER/makefile && \
  export KERNEL_BUILD="../../../kernel/$RTOS/builds/$BOARDNAME/release"

make -C app/$RTOS/$COMPILER clean

COMPILER=ccs
# for old SDK versions, we need to make the kernel separately
# and patch $DEST/$NAME/tirtos/ccs/makefile"
[[ ${TISL_SDK##*_} = 5.30.00* ]] && \
  echo "Clean kernel ..." && \
  make -C kernel/$RTOS/builds/$BOARDNAME/release/$COMPILER clean && \
  sed -i -e 's/^KERNEL_BUILD\s*:=/KERNEL_BUILD ?=/' app/$RTOS/$COMPILER/makefile && \
  export KERNEL_BUILD="../../../kernel/$RTOS/builds/$BOARDNAME/release"

make -C app/$RTOS/$COMPILER clean
