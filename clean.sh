set -e

source ~/.tisl/sdks/5.30.00.03.env
#export GCC_ARMCOMPILER=~/.tisl/packages/arm.gnu__9.2.1
RTOS=$TIRTOSNAME
COMPILER=ccs
make -C app/$RTOS/$COMPILER clean

