set -e

source ~/.tisl/sdks/5.30.00.03.env # set by tinit
COMPILER=ccs # set by tinit
RTOS=$TIRTOSNAME
make -C app/$RTOS/$COMPILER

OUT=app/$RTOS/$COMPILER/*.out
ls -l $OUT
