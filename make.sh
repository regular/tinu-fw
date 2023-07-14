set -e
source ~/.tisl/sdks/5.30.00.03.env # set by tinit
NAME=${NAME:-tinu_fw}
COMPILER=ccs # set by tinit
RTOS=$TIRTOSNAME
make -C app/$RTOS/$COMPILER
OUT=app/$RTOS/$COMPILER/$NAME.out
ls -l $OUT
