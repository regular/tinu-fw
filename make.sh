set -e
source ~/.tisl/sdks/5.30.00.03.env # set by tinit
NAME=${NAME:-tinu_fw}
BUILDDIR=${BUILDDIR:-app}
COMPILER=ccs # set by tinit
RTOS=$TIRTOSNAME
make -C $BUILDDIR/$RTOS/$COMPILER
OUT=$BUILDDIR/$RTOS/$COMPILER/$NAME.out
ls -l $OUT
